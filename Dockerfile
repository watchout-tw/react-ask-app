FROM node:0.10
MAINTAINER Pomin Wu <pomin5@gmail.com>
EXPOSE 8080

ADD . /app
WORKDIR /app
RUN npm install
RUN npm run build
CMD npm start
