# Use Node.js 18 LTS Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend files
COPY . .

# Expose the backend port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
