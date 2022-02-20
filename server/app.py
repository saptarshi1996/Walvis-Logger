from flask import Flask, Response, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from io import BytesIO, StringIO

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    JWTManager,
)

from helpers import docker_helper
from config import constant

import time
import json
import csv

from datetime import timedelta
from dotenv import load_dotenv

# loading env variables.
load_dotenv()


app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = constant.JWT_SECRET_KEY
jwt = JWTManager(app)
cors = CORS(app)

################################  CONTROLLERS ##########################################


@app.route("/logger-server/auth/login", methods=["POST"])
@cross_origin()
def login():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)

        if username != constant.USER or password != constant.PASSWORD:
            return jsonify({"message": "Invalid username or password"}), 401

        # create an access token that will expire after 7 days.
        access_token = create_access_token(
            identity=username, expires_delta=timedelta(days=7)
        )

        return jsonify(access_token=access_token), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/logger-server/container_list", methods=["GET"])
@cross_origin()
@jwt_required()
def get_container_list():
    container_list = docker_helper.list_containers()
    return jsonify(Response={"data": container_list}), 200


@app.route("/logger-server/container_restart/<id>")
@cross_origin()
def container_restart(id):
    try:
        docker_helper.get_client().containers.get(id).restart()
        return jsonify({"message": "Container restarted successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/logger-server/stream/<id>")
@cross_origin()
def stream_logs(id):

    # check if the container is running, else don't run the stream
    tail = request.args.get("tail")

    if tail and tail != "all":
        tail = int(tail)

    if request.headers.get("accept") == "text/event-stream":

        def events():

            container = docker_helper.get_client().containers.get(id)
            target = container.logs(
                stream=True, follow=True, tail=tail, timestamps=True
            )

            try:
                while True:

                    line = next(target)

                    timestamp, *message_list = line.decode("utf-8").split(" ")
                    message = " ".join(message_list)

                    log = {"timestamp": timestamp, "message": message}

                    yield "data: %s\n\n" % (json.dumps(log))
                    time.sleep(0.1)  # an artificial delay
            except StopIteration:
                print("Logger stopped")

        return Response(events(), mimetype="text/event-stream")

    return Response(status=400)


@app.route("/logger-server/stats/<id>")
@cross_origin()
def stream_stats(id):

    if request.headers.get("accept") == "text/event-stream":

        def events():

            container = docker_helper.get_client().containers.get(id)
            streams = container.stats(stream=True)

            try:
                while True:
                    line = next(streams)
                    line = line.decode("utf-8")
                    started_at = container.attrs["State"]["StartedAt"]
                    line = json.loads(line)
                    line["started_at"] = started_at
                    line = json.dumps(line)
                    yield "data: %s\n\n" % (line)
                    time.sleep(0.1)  # an artificial delay
            except StopIteration:
                print("Logger stopped")

        return Response(events(), mimetype="text/event-stream")

    return Response(status=400)


@app.route("/logger-server/download-logs/<id>")
@cross_origin()
def download_logs(id):
    try:

        format, file_name = request.args.get("log_format"), request.args.get(
            "file_name"
        )

        if format == "json":

            file_object = docker_helper.download_logs(id)

            buffer = BytesIO()
            json_string = json.dumps(file_object)
            buffer.write(bytes(json_string, encoding="utf-8"))
            buffer.seek(0)

            return send_file(
                buffer,
                as_attachment=True,
                attachment_filename="{0}.json".format(file_name.replace(" ", "")),
                mimetype="application/json",
            )

        elif format == "csv":

            file_object = docker_helper.download_logs(id)
            string_buffer = StringIO()

            logs = file_object["logs"]
            log_list = [[log["timestamp"], log["message"]] for log in logs]

            writer = csv.writer(string_buffer)
            writer.writerows(log_list)

            buffer = BytesIO()
            buffer.write(string_buffer.getvalue().encode("utf-8"))
            buffer.seek(0)

            string_buffer.close()

            # send file to user end
            return send_file(
                buffer,
                as_attachment=True,
                attachment_filename="{0}.csv".format(file_name.replace(" ", "")),
                mimetype="text/csv",
            )

    except Exception as e:
        print(e)
        return jsonify(Response={"message": str(e)}), 500


################################  CONTROLLERS ##########################################

if __name__ == "__main__":
    app.run(host=constant.HOST, port=constant.PORT)
