#!/bin/bash

echo "--------- Installing Docker and other packages ---------"
yum update -y 
yum install -y docker git make
service docker start

echo -e "--------- Pull Dockerfile ---------\n"
cd ~
git clone https://github.com/erodrigufer/catDict.git 
cd catDict
make build 

docker run -d --rm -p 80:80 --env AUTH_USERNAME=${AUTH_USERNAME} --env AUTH_PASSWORD=${AUTH_PASSWORD} --env API_URL=${API_URL} catdict_webapp
