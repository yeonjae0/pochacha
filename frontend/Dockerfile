FROM nginx

COPY ./build /usr/share/nginx/html

RUN rm -rf /etc/nginx/nginx.conf

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx

COPY certs/server.crt /etc/nginx/server.crt
COPY certs/server.key /etc/nginx/server.key

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
