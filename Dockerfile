FROM node:15.14.0

WORKDIR /app

RUN cd /client && npm install && npm run build && cd .. && npm install

EXPOSE 8000
