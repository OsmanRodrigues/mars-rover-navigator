FROM node:12.19-alpine
WORKDIR /api
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 5000

CMD yarn start
