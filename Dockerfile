FROM node:20.11.0

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ENV HOST=std-eng.ir

EXPOSE 80

CMD ["npm", "start"]