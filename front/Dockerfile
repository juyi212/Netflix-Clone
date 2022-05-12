FROM node:lts-alpine3.14

WORKDIR /front

COPY ./package.json /front

RUN npm install

RUN yarn

COPY . /front

CMD ["yarn", "dev"]

EXPOSE 3000
