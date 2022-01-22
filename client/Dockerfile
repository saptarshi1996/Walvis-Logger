FROM node:14.17.3

WORKDIR /app

COPY . ./

RUN npm install

EXPOSE 3300 9099

RUN npm run build
RUN npm run generate
