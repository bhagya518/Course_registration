# backend/Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port (example: 4000)
EXPOSE 4000

# Start the backend
CMD ["node", "service.js"]
