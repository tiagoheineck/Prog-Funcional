FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git openssh-client ca-certificates

COPY . .

CMD ["node", "exemplos/imperativa.js"]