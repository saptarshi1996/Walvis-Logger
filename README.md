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

- [Flask] - Used to build the backend server.
- [Docker-Python-API] - For getting docker container related details.
- [NuxtJS] - For building the frontend along with Vue.
- [Vuetify] - UI library used for Walvis.
- [Server-Side-Events] - For real time streaming of stats and logs.
- [Docker] - Without docker, there are no logs.
- [Docker-Compose] - For building images and starting containers.

and Walvis itself :)

## Installation

Walvis requires Node 14.17.3 for the frontend and Python 3.10.0 for the backend

Install the dependencies and devDependencies and start the server.

Create a .env file in the client folder and add the following:

```

PORT=3300
HOST=0.0.0.0
BASE_ENDPOINT=/logger

SERVER_BASE_URL=http://localhost:9099

```

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

### Deployment

To deploy walvis production, it is recommended to deploy using nginx. 
For nginx to pass server side events use the demo config.

```
location /logger { 
    proxy_pass http://127.0.0.1:3300;
    proxy_set_header Connection '';
    chunked_transfer_encoding off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_buffering off;
    proxy_cache off;

}

location /logger-server { 
    proxy_pass http://127.0.0.1:9099;
    proxy_set_header Connection '';
    chunked_transfer_encoding off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_buffering off;
    proxy_cache off;
}
```

## Docker


Run the Docker images and map the port to whatever you wish on your host.
Note: It is mandatory to provide the volume, otherwise the container will not be able to get the logs.

```sh
bash deploy.bash on
```

You can then see the logger working on 

```sh
127.0.0.1:3000
```
