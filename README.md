# Walvis

Walvis is a small lightweight application with a web based interface to monitor Docker logs. It is for live monitoring of your container logs only.

- Start some containers and check your browser

## Features

- Search for containers.
- Get all your running containers list.
- Realtime docker container logs with date and time.
- Support for tail and all logs.
- Get realtime stats of your containers.

## Tech

Walvis uses a number of tools and frameworks:

- [Express] - Used to build the backend server.
- [Dockerode] - For getting docker container related details.
- [NuxtJS] - For building the frontend along with Vue.
- [Vuetify] - UI library used for Walvis.
- [SocketIO] - For real time streaming of stats and logs.
- [Docker] - Without docker, there are no logs.
- [Docker-Compose] - For building images and starting containers.

and Walvis itself :)

## Installation

Walvis requires Node 14.17.3

Install the dependencies and devDependencies and start the server.

Create a .env file in the client folder and add the following:

```bash

HOST=0.0.0.0
PORT=3000

BASE_URL=http://localhost:8000


```

Then create a .env file in the server folder and add the following:

```bash

PORT=8000
HOST=0.0.0.0
ENV=LOCAL

JWT_SECRET=

```

```bash

# install dependencies
$ npm install

```
## Docker


Run the Docker images and map the port to whatever you wish on your host.
Note: It is mandatory to provide the volume, otherwise the container will not be able to get the logs.

```sh
docker run -p 8000:8000 -v /var/run/docker.sock:/var/run/docker.sock -d saptarshisg96/walvis-logger:latest
```

You can then see the logger working on 

```sh
http://127.0.0.1:8000
```
