import time

from flask import Flask, Response, request, jsonify, render_template
from flask_cors import CORS, cross_origin

from helpers import (docker_helper)

app = Flask(__name__, static_folder="./client/dist/_nuxt",
            template_folder="./client/dist")

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

    if request.headers.get('accept') == 'text/event-stream':
        def events():

            container = docker_helper.get_client().containers.get(id)
            target = container.logs(stream=True, follow=True)

            try:
                while True:
                    line = next(target)
                    yield "data: %s\n\n" % (line.decode("utf-8"))
                    time.sleep(0.5)  # an artificial delay
            except StopIteration:
                print("Logger stopped")

        return Response(events(), mimetype='text/event-stream')

    return Response(status=400)


################################  CONTROLLERS ##########################################


if __name__ == "__main__":
    app.run(host='localhost', port=9999)
