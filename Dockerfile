# Set base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy backend files
COPY back-end/ ./back-end/

# Set working directory to back-end
WORKDIR /app/back-end

# Install dependencies
RUN npm install

# Set environment variable
ENV PORT=5000

# Expose the port
EXPOSE $PORT

# Start the backend server
CMD ["npm", "start"]
