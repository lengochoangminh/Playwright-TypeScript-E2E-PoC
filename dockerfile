# filename: dockerfile

# Base image
FROM node:20

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Set the working directory
WORKDIR /app

# Copy the of the application files
COPY . .

# Install dependencies
RUN npm ci --force

# Set the entry point for the container
# CMD ["npx", "playwright", "test"]
ENTRYPOINT npx playwright test $TESTS