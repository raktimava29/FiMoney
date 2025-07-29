# Set base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy the root-level package.json and package-lock.json
COPY package*.json ./

# Install dependencies from root
RUN npm install

# Copy rest of the project (including back-end folder)
COPY . .

# Set environment variable
ENV PORT=5000

# Expose the port
EXPOSE $PORT

# Start the backend server from back-end/index.js
CMD ["nodemon", "back-end/index.js"]
