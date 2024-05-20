.PHONY: build run deploy

build:
	docker build . --tag catdict_webapp

build.linux:
	docker build . --platform linux/amd64 --tag ${DOCKER_REPO}

docker.push: build.linux
	docker push ${DOCKER_REPO}

run:
	docker run -d --rm -p 80:80 --env AUTH_USERNAME=${AUTH_USERNAME} --env AUTH_PASSWORD=${AUTH_PASSWORD} --env API_URL=${API_URL} catdict_webapp

deploy:
	cd ./terraform/webapp/do && terraform init -upgrade && terraform apply

destroy:
	cd ./terraform/webapp/do && terraform destroy


