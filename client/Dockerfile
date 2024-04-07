FROM node:18

ENV WATCHPACK_POLLING true

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD npx serve -p 3001 ./out
