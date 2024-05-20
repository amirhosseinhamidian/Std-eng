FROM node:20.11.0

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 80

CMD ["npm", "start"]