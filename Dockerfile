FROM node:lts-alpine

WORKDIR /app

COPY ./server ./server

COPY ./package.json ./package.json

COPY ./.babelrc ./.babelrc

ENV PORT=3000

RUN npm install

RUN npm run build

EXPOSE 3000