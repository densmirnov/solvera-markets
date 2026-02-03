FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json ./
RUN npm install --omit=dev

COPY src ./src

RUN npm install --include=dev && npm run build && npm prune --omit=dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
