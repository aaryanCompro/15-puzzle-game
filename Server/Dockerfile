FROM --platform=linux/arm64 node:18 
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY data.json data.json
COPY index.js index.js

EXPOSE 8000
CMD [ "node", "/app/index.js" ] 