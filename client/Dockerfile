FROM node:14.17.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3300 9099

RUN npm run build
RUN npm run generate
