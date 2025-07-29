# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY back-end/package*.json ./back-end/

# Install backend dependencies
RUN cd back-end && npm install

# Copy the rest of the code
COPY . .

# Set environment variable for port (can be overridden at runtime)
ENV PORT=5000

# Expose the port
EXPOSE $PORT

# Start the backend server
CMD ["npm", "start", "--prefix", "back-end"]
