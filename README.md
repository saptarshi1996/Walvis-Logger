# Walvis

Walvis is a small lightweight application with a web based interface to monitor Docker logs. It is for live monitoring of your container logs only.

- Start some containers and check your browser

## Features

- Get all your running containers list.
- Realtime docker container logs with date and time.
- Support for tail and all logs.
- Get realtime stats of your containers.

## Tech

Walvis uses a number of tools and frameworks:

- [Flask] - Used to build the backend server.
- [Docker-Python-API] - For getting docker container related details.
- [NuxtJS] - For building the frontend along with Vue.
- [Vuetify] - UI library used for Walvis.
- [Server-Side-Events] - For real time streaming of stats and logs.
- [Docker] - Without docker, there are no logs.

and Walvis itself :)

## Installation

Walvis requires Node 14.17.3 for the frontend and Python 3.10.0 for the backend

Install the dependencies and devDependencies and start the server.

```bash

# install dependencies
$ npm install

# install pip packages
$ pip install -r requirements.txt
$ python3 main.py

```


## Development

To start developing:

```sh
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run generate

# Flask runs on port 9999
```

## Docker

Walvis can be build with docker

```sh

# pull image from docker hub 
docker pull saptarshisg96/walvis-logger

# build image
docker build -t <youruser>/walvis-logger .

```

This will create the walvis image and pull in the necessary dependencies..

Once done, run the Docker image and map the port to whatever you wish on
your host.

Note: It is mandatory to provide the volume, otherwise the container will not be able to get the logs.

```sh
docker run -it --volume=/var/run/docker.sock:/var/run/docker.sock -p 9999:9999 saptarshisg96/walvis-logger
```

You can then see the logger working on 

```sh
127.0.0.1:3000
```
