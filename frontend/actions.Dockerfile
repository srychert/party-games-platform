# build stage
FROM node:alpine AS builder

# set working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./frontend/package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY ./frontend .

COPY ./.env* .

RUN ls

# build app for production with minification
RUN npm run build

# nginx state for serving content
FROM nginx:alpine-slim

# copy nginx config
COPY ./frontend/nginx/default.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
