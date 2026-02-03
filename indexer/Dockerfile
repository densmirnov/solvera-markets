FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json subgraph.yaml schema.graphql ./
COPY abis ./abis
COPY src ./src

RUN npm install

CMD ["/bin/sh", "-c", "npm run codegen && npm run build"]
