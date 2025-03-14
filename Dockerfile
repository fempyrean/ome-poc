FROM airensoft/ovenmediaengine:latest

RUN apt update && apt upgrade -y
RUN apt install -y vim