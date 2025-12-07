# Use Node.js official image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend
CMD ["node", "service.js"]
