FROM node:15.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p ./client

COPY ./client/package*.json ./client/

RUN cd ./client && npm install && cd ..

COPY . ./

RUN rm -f -r ../build && cd client && npm run build && mv build ../ && cd ..

EXPOSE 8000

CMD ["bash", "entrypoint.bash"]
