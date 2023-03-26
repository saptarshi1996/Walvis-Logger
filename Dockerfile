FROM node:16.19.0

WORKDIR /app

COPY ./server/package*.json /app/server/

RUN cd /app/server && npm install

RUN mkdir -p /app/client

COPY ./client/package*.json /app/client/

RUN cd ./client && npm install

COPY ./client /app/client

COPY ./server/ /app/server/

RUN npm i pm2 -g

RUN cd /app/client && npm run build

COPY ./entrypoint.sh /app/

EXPOSE 3000 8000

CMD ["./entrypoint.sh"]
