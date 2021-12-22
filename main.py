import time

from flask import Flask, Response, request, jsonify, render_template
from flask_cors import CORS, cross_origin

from helpers import (docker_helper)

app = Flask(__name__, static_folder="./client/dist/_nuxt", template_folder="./client/dist")

cors = CORS(app)

################################  CONTROLLERS ##########################################

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/container_list', methods=["GET"])
@cross_origin()
def get_container_list():
    container_list = docker_helper.list_containers()
    return jsonify(Response={"data": container_list}), 200


@app.route('/stream/<id>')
@cross_origin()
def stream_logs(id):

    # check if the container is running, else don't run the stream
    tail = request.args.get('tail')

    if tail != "all":
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


@app.route("/close_container/<id>", methods=['GET'])
@cross_origin()
def close_container_by_id(id):

    # close the container by container id
    try:
        docker_helper.close_container_by_id(id)
        return jsonify(StatusCode=200, Response={"message": "Container {0} closed successfully".format(id)}), 200
    except Exception as e:
        return jsonify(StatusCode=500, Response={"message": "Internal Server Error"}), 500


################################  CONTROLLERS ##########################################


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9999)
