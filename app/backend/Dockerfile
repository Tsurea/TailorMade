# syntax=docker/dockerfile:1

# Get the container image
FROM node:21-alpine

# Update and Upgrade the list of packages
RUN apk -U upgrade

# Update npm to the latest version
RUN npm install -g npm@10.2.2

# Create the backend directory
WORKDIR /srcs

# Copy the backend files
COPY ./srcs/src src
COPY ./srcs/package.json package.json
COPY ./srcs/package-lock.json package-lock.json
COPY ./srcs/nest-cli.json nest-cli.json
COPY ./srcs/tsconfig.json tsconfig.json
COPY ./srcs/tsconfig.build.json tsconfig.build.json

# Copy the entrypoint script
COPY ./entrypoint.sh /

# Launch the backend entrypoint script
ENTRYPOINT ["sh", "/entrypoint.sh"]
