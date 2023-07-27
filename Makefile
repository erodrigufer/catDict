build:
	docker build . -t catdict_webapp
deploy:
	docker-compose up -d --build

