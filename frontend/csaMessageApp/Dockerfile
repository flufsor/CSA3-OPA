FROM node:lts AS stage-1

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --

FROM nginx:stable-alpine AS stage-2

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=stage-1 /app/dist/csa-message-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]