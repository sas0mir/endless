FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY certs ./certs

RUN npm run build

RUN cp -r certs .output/certs

EXPOSE 3000

CMD ["npm", "run", "preview"]