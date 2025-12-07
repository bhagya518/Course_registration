# Use lightweight Nginx image
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your static files to Nginx html folder
COPY public/ /usr/share/nginx/html
