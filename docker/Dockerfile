# Etapa 1: build da aplicação
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem final
FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY firebase.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
