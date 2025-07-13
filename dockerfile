# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY . .

# Install dependencies
RUN npm install

# Command to run the application
CMD ["bash", "entrypoint.sh"]

