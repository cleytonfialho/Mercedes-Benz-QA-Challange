FROM jenkins/jenkins:latest

USER root

ENV CI=true
ENV DEBIAN_FRONTEND=noninteractive
# Install dependencies
RUN apt-get update && \
    apt-get install -y apt-transport-https \
                       ca-certificates \
                       curl \
                       gnupg \
                       lsb-release

# Install Docker 
RUN curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
RUN apt-get update && apt-get install -y docker.io

###RUN DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
#RUN mkdir -p $DOCKER_CONFIG/cli-plugins
#RUN  curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
