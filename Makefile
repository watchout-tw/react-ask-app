
.PHONY: build test run start stop

build:
	docker build -t react-ask-app .

test:
	docker run -it --rm -p 8080:8080 --name react-ask-app react-ask-app

rm:
	docker rm -f react-ask-app || exit 0

run:
	docker run -dt -p 8080:8080 --name react-ask-app react-ask-app
