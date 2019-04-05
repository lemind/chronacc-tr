FROM node:latest

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN echo "over there ${NODE_ENV}"

# common

WORKDIR /app/

COPY . /app/

# client

WORKDIR /app/client/

RUN npm install

RUN npm run build

EXPOSE 8090

# server

WORKDIR /app/server

RUN npm install

EXPOSE 80

CMD ["npm", "run", "start:prod"]
