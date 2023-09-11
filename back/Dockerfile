FROM node:18.13.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

RUN npm install

RUN apk update && apk add nano

COPY . .

ENV PORT=8000

EXPOSE 8000

RUN npm run seed

CMD ["npm", "run", "dev"]