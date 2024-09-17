FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm i --force


COPY . .
EXPOSE 5173
