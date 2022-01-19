FROM ubuntu:20.04
FROM python:3.10.0 as py_builder

WORKDIR /app

COPY . ./

RUN apt-get update -y && apt-get dist-upgrade -y && apt-get install python3-pip -y && apt-get clean -y
RUN pip3 install -r requirements.txt

EXPOSE 9099 3300
