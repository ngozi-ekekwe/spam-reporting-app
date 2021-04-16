FROM node:lts-alpine as build

WORKDIR /app

COPY . .

ENV SKIP_PREFLIGHT_CHECK=true 
ENV INLINE_RUNTIME_CHUNK=false
ENV NODE_ENV=production
ENV REACT_APP_URL=

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf