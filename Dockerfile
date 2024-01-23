# Stage 1: Build the application
FROM node:18-slim as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the service
RUN npm run build

# Stage 2: Create the final image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the compiled code from the build stage
COPY --from=build /app ./

# Set the command to run the demo
CMD ["npm", "run", "preview"]

EXPOSE 4001