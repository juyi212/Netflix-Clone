FROM node:lts-alpine3.14

WORKDIR /front

COPY ./package.json /front

RUN npm install

RUN yarn

COPY . /front

CMD ["yarn", "build"]

EXPOSE 3000
