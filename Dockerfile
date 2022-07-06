FROM node:15.14.0

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN mkdir -p ./client

COPY ./client/package*.json ./client/

RUN cd ./client && npm install && cd ..

COPY . ./

EXPOSE 7080

CMD ["bash", "entrypoint.bash"]
