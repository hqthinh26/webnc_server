FROM node:10
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install
RUN ls ./node_modules

RUN yarn global add knex nodemon mocha