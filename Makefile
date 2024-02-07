.PHONY: build run deploy

build:
	docker build . --tag catdict_webapp

run:
	docker run -d --rm -p 80:80 --env AUTH_USERNAME=${AUTH_USERNAME} --env AUTH_PASSWORD=${AUTH_PASSWORD} --env API_URL=${API_URL} catdict_webapp

deploy:
	docker-compose up -d --build

