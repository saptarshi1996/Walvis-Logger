FROM ubuntu:20.04
FROM python:3.10.0 as py_builder
FROM node:14.17.3 as node_builder

WORKDIR /usr/src/app

COPY . ./

EXPOSE 9999 3000

RUN apt-get update -y && apt-get dist-upgrade -y && apt-get install python3-pip -y && apt-get clean -y
RUN pip3 install -r requirements.txt

CMD ["sh", "-c", "cd client && npm run build && npm run generate"]
ENTRYPOINT ["python3", "main.py"]
