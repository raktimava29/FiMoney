# Set base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY back-end/package*.json ./back-end/

# Change WORKDIR to back-end, THEN run npm install
WORKDIR /app/back-end
RUN npm install

# Now copy the rest of the backend code
COPY back-end/ /app/back-end/

# Set environment variable for port (can be overridden at runtime)
ENV PORT=5000

# Expose the port
EXPOSE $PORT

# Start the backend server
CMD ["npm", "start"]
