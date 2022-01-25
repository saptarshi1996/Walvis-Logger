import time
import json

from flask import Flask, Response, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from io import BytesIO, StringIO

from helpers import docker_helper

app = Flask(__name__)

cors = CORS(app)

################################  CONTROLLERS ##########################################


@app.route('/logger-server/container_list', methods=["GET"])
@cross_origin()
def get_container_list():
    container_list = docker_helper.list_containers()
    return jsonify(Response={"data": container_list}), 200


@app.route('/logger-server/stream/<id>')
@cross_origin()
def stream_logs(id):

    # check if the container is running, else don't run the stream
    tail = request.args.get('tail')

    if tail and tail != "all":
        tail = int(tail)

    if request.headers.get('accept') == 'text/event-stream':
        def events():

            container = docker_helper.get_client().containers.get(id)
            target = container.logs(stream=True, follow=True, tail=tail)

            try:
                while True:
                    line = next(target)
                    yield "data: %s\n\n" % (line.decode("utf-8"))
                    time.sleep(0.1)  # an artificial delay
            except StopIteration:
                print("Logger stopped")

        return Response(events(), mimetype='text/event-stream')

    return Response(status=400)


@app.route('/logger-server/stats/<id>')
@cross_origin()
def stream_stats(id):

    if request.headers.get("accept") == 'text/event-stream':

        def events():

            container = docker_helper.get_client().containers.get(id)
            streams = container.stats(stream=True)

            try:
                while True:
                    line = next(streams)
                    yield "data: %s\n\n" % (line.decode("utf-8"))
                    time.sleep(0.1)  # an artificial delay
            except StopIteration:
                print("Logger stopped")
        
        return Response(events(), mimetype='text/event-stream')
    
    return Response(status=400)


@app.route("/logger-server/download-logs/<id>")
@cross_origin()
def download_logs(id):
    try:

        format, file_name = request.args.get('log_format'), request.args.get('file_name')
        since, until = request.args.get('since'), request.args.get('until')

        if format == 'json':
            file_object = docker_helper.download_json_logs(id, since, until)
            buffer = BytesIO()
            json_string = json.dumps(file_object)
            buffer.write(bytes(json_string, encoding="utf-8"))
            buffer.seek(0)

            return send_file(buffer, as_attachment=True, attachment_filename="{0}.json".format(file_name), mimetype="application/json")

    except Exception as e:
        return jsonify(Response={"message": str(e)}), 500


################################  CONTROLLERS ##########################################


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9099)
