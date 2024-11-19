# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port for the WebSocket server
EXPOSE 3001

# Run the application
CMD ["npm","run","start"]
