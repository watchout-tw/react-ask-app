
.PHONY: build test run start stop

build:
	docker build -t react-ask-app .

test:
	docker run -it --rm -p 8080:8080 --name react-ask-app react-ask-app

run:
	docker run -dt -p 8080:8080 --name react-ask-app react-ask-app
