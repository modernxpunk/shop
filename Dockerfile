FROM node:alpine AS build

WORKDIR /app
COPY . .

RUN npm i -g pnpm@latest
RUN pnpm i
RUN pnpm run build

EXPOSE 3000
CMD [ "pnpm", "preview", "--host" ]
