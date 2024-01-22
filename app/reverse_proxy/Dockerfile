# syntax=docker/dockerfile:1.0

# Get the container Image
FROM nginx:alpine

# Update the index of available packages
# Upgrade the currently installed packages
RUN apk -U upgrade

# SSL
RUN apk add certbot certbot-nginx
RUN mkdir -p /etc/nginx/ssl/
# COPY ./conf/fullchain.pem /etc/nginx/ssl/fullchain.pem
# COPY ./conf/privkey.pem /etc/nginx/ssl/privkey.pem

# Add the custom nginx configuration files
COPY ./conf/localhost.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

# Launch the webserver
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
