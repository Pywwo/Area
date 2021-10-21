FROM node:10

WORKDIR /server

COPY package*.json ./


RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 8080

CMD npm start
