FROM node:16.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p ./client

COPY ./client/package*.json ./client/

RUN cd ./client && npm install && cd ..

COPY . ./

RUN rm -f -r ../dist && cd client && npm run build && npm run generate && mv dist ../ && cd ..

EXPOSE 8000

CMD ["bash", "entrypoint.bash"]
