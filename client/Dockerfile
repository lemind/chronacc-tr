FROM node:latest

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 8090

RUN npm run build

CMD ["npm", "run", "start:prod"]
