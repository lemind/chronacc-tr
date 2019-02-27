FROM node:latest

RUN npm install -g nodemon

WORKDIR /server

COPY package*.json /server/

RUN npm install

COPY . /server/

EXPOSE 80

CMD ["npm", "start"]
