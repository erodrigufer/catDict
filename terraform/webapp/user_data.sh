#!/bin/bash
# Respond with a webpage with the private IP of the instance on port 80.

FILE_NAME="/var/www/index.html"

mkdir /var/www
touch /var/www/index.html
echo "<h1>Hostname: $(hostname -f)</h1>" >> ${FILE_NAME}

echo "<h2>${AUTH_USERNAME}</h2>" >> ${FILE_NAME}

echo -e "--------- Installing Docker ---------\n" >> ${FILE_NAME}
yum update -y 
yum install -y docker git make >> ${FILE_NAME}
service docker start

echo -e "--------- Pull Dockerfile ---------\n" >> ${FILE_NAME}
cd ~
git clone https://github.com/erodrigufer/catDict.git 
cd catDict
make build 

docker run -d --rm -p 80:80 --env AUTH_USERNAME=${AUTH_USERNAME} --env AUTH_PASSWORD=${AUTH_PASSWORD} --env API_URL=${API_URL} catdict_webapp

# echo -e "--------- Print Docker commands ---------\n" >> ${FILE_NAME}
# docker images >> ${FILE_NAME}
# docker ps >> ${FILE_NAME}

# cd /var/www
# python3 -m http.server 80
