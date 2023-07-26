FROM nginx

COPY ./build /usr/share/nginx/html

RUN rm -rf /etc/nginx/nginx.conf

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx

COPY ./cert/fullchain.pem /etc/nginx
COPY ./cert/privkey.pem /etc/nginx
COPY ./cert/options-ssl-nginx.conf /etc/nginx
COPY ./cert/ssl-dhparams.pem /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
