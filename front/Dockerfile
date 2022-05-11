FROM node:lts-alpine3.14

WORKDIR /front

COPY ./package.json /front

RUN npm install

RUN yatn

COPY . /front

CMD ["yarn", "dev"]

EXPOSE 3000
