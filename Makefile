
.PHONY: build test run start stop

build:
	docker build -t react-ask-app .

test:
	docker run -it --rm -p 8080:8080 --name react-ask-app react-ask-app

rm:
	docker rm -f react-ask-app || exit 0

run:
	docker run -dt -p 8080:8080 --name react-ask-app react-ask-app

deploy:
	docker export react-ask-app | ssh runner@192.168.191.125 'docker import - react-ask-app:latest && docker rm -f react-ask-app && docker run -dt -p 8080:8080 --name react-ask-app -w /app react-ask-app npm start'

clean:
	rm -rf public/assets
	rm -rf public/app.html
