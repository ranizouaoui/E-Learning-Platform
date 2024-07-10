FROM nginx:alpine
COPY Dockerfiles/nginx/default.conf /etc/nginx/conf.d/default.conf
