FROM node:11-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PATH /usr/app/node_modules/.bin:$PATH
RUN (rm -rf ./public/apk && mkdir ./public/apk) || echo -n

CMD ["npm", "start"]
