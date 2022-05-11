FROM node:lts-alpine3.14

WORKDIR /front

COPY ./package.json /front

RUN npm install

RUN npm install yarn

COPY . /front

RUN yarn run dev

CMD ["npx", "serve", "-s", "build"]

EXPOSE 3000
