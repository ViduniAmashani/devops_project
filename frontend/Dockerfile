# Use Node 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 3000
EXPOSE 3000

# Use polling for file changes (useful in Docker)
ENV CHOKIDAR_USEPOLLING=true

# Start React
CMD ["npm", "start"]
