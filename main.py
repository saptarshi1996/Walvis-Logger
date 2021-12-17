import docker

import time
from flask import Flask, Response, request, jsonify

app = Flask(__name__)
client = docker.DockerClient(base_url="unix://var/run/docker.sock")


def list_containers():

    containers = client.containers.list()
    container_list = []
    for container in containers:
        container_list.append({
            "id": container.id,
            "name": container.name
        })

    return container_list


@app.route('/list', methods=["GET"])
def get():
    return jsonify(Response={"data": list_containers()}), 200


@app.route('/stream/<id>')
def index(id):

    # check if the container is running, else don't run the stream
    container = client.containers.get(id)

    if request.headers.get('accept') == 'text/event-stream':

        target = container.logs(stream=True, follow=True)
        print(target)

        def events():

            try:
                while True:
                    line = next(target)
                    yield "data: %s" % (line)
                    time.sleep(.1)  # an artificial delay
            except StopIteration:
                print(f'log stream ended')

        return Response(events(), content_type='text/event-stream')

    return Response(status=400)


if __name__ == "__main__":
    app.run(host='localhost', port=9999)
