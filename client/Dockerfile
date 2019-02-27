FROM node:latest

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 8090

CMD ["npm", "start"]
