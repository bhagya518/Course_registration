# frontend/Dockerfile
FROM nginx:alpine

# Copy built frontend files to nginx html folder
COPY public /usr/share/nginx/html

# Copy custom nginx configuration if any
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
