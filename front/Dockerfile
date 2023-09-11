FROM node:18.13.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BASE_URL

RUN echo "VITE_BASE_URL:${VITE_BASE_URL}"

RUN echo "VITE_BASE_URL${VITE_BASE_URL}" > .env

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]