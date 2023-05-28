FROM node:18-alpine AS builder
COPY live-chat-app /tmp
WORKDIR /tmp
RUN npm install && npm run build

FROM nginx:alpine

COPY --from=builder /tmp/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]