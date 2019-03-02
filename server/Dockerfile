FROM node:latest

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN echo "over there ${NODE_ENV}"

RUN if [ "$NODE_ENV" == "development" ] ; \
  then npm install -g nodemon ; \
  else echo prod over there ; \
  fi

WORKDIR /server

COPY package*.json /server/

RUN npm install

COPY . /server/

EXPOSE 80

CMD ["npm", "run", "start:prod"]
