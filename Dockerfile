FROM node:alpine AS build

WORKDIR /app
COPY . .

RUN npm i -g pnpm@latest
RUN pnpm i
RUN pnpm run build

CMD [ "pnpm", "preview", "--host" ]
