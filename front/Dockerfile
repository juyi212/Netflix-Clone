FROM node:lts-alpine3.14

WORKDIR /front

COPY ./package.json /front

RUN npm install

RUN yarn

COPY . /front

CMD ["yarn", "dev"]

EXPOSE 3000

# FROM node:12.2.0-alpine
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install
# RUN npm install react-scripts@3.0.1 -g
# CMD ["npm", "start"]
