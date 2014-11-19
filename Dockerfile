FROM node:0.10
MAINTAINER Pomin Wu <pomin5@gmail.com>
EXPOSE 8080

RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime
RUN echo 'Asia/Taipei' > /etc/timezone

ADD . /app
WORKDIR /app
RUN npm install || exit 0
RUN npm run build
CMD npm start
