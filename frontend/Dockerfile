FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom server block config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY public/ /usr/share/nginx/html

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
