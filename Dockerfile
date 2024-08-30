# Build Stage for Vue.js Client
FROM --platform=linux/arm64 node:18 AS build

WORKDIR /app/Client
COPY Client/package*.json ./
RUN npm install
COPY Client/ ./
RUN npm run build
FROM nginx:stable-alpine AS prod
COPY --from=build /app/Client/dist/ /usr/share/nginx/html

FROM --platform=linux/arm64 node:18
RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./

WORKDIR /app/Server
COPY Server/package.json ./
RUN npm install
COPY Server/ ./

COPY --from=prod /usr/share/nginx/html /usr/share/nginx/html
COPY supervisord.conf /etc/supervisor/supervisord.conf
EXPOSE 80 8000

CMD [ "supervisord", "-c", "/etc/supervisor/supervisord.conf" ]
