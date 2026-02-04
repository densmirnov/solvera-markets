FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json vite.config.ts eslint.config.js postcss.config.js index.html SKILL.md ./
COPY src ./src

ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

RUN npm install
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
