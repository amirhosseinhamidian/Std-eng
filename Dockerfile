# Stage 1: Build the application
FROM node:20.11.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:20.11.0

WORKDIR /app

# Copy the build output to the final image
COPY --from=build /app .

# Install production dependencies
RUN npm install --legacy-peer-deps

# Expose the port your application runs on
EXPOSE 3000

ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

# Start the application
CMD ["npm", "start"]
