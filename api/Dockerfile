FROM node:12.19-alpine
WORKDIR /api
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4040

CMD yarn start
