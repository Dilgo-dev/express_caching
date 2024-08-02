FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

ENV PORT=3000

COPY . .

EXPOSE 3000

CMD ["npm", "start"]