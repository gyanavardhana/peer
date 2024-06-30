# Use a base image that supports Node.js
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Install PeerJS server globally
RUN npm install -g peer

# Expose port 3001 (default PeerJS port)
EXPOSE 3001

# Command to start PeerJS server
CMD ["peerjs", "--port", "3001"]
