FROM node:20.11.0

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ENV HOST=std-eng.ir

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]