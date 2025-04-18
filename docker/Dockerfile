# Etapa 1: build da aplicação
FROM node:18 AS builder

WORKDIR /app

COPY ../package*.json ./
RUN npm install

COPY .. .
RUN npm run build

# Etapa 2: imagem final para produção
FROM node:18-slim

WORKDIR /app

COPY ../package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
