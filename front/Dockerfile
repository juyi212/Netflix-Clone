# FROM node:lts-alpine3.14
# WORKDIR /front

# COPY ./package.json /front

# RUN npm install

# RUN yarn

# COPY . /front

# # FROM nginx:stable-alpine as production-stage
# # RUN rm /etc/nginx/conf.d/default.conf
# # COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf
# # COPY --from=build-stage ./homepage/build /usr/share/nginx/html/homepage

# # EXPOSE 80
# EXPOSE 3000

# CMD ["yarn", "run", "build"]
# CMD ["nginx", "-g", "daemon off;"]
# FROM node:12.2.0-alpine
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install
# RUN npm install react-scripts@3.0.1 -g
# CMD ["npm", "start"]

FROM node:lts-alpine as build-stage
WORKDIR /homepage
COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf

COPY --from=build-stage ./homepage/build /usr/share/nginx/html/homepage
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
