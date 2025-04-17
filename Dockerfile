# ===================================================================
# Build stage
# ===================================================================
FROM node:22-bookworm-slim AS build
# Set working directory for all subsequent commands
WORKDIR /app
# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
# Install all dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Note: You might want to add RUN npm run build here if your app needs 
#         building

# ===================================================================
# Runtime stage - using minimal distroless image for security
# ===================================================================
FROM gcr.io/distroless/nodejs22-debian12
# Set working directory for runtime
#WORKDIR /app
# Copy only built assets from the build stage
COPY --from=build /app /usr/src/app
WORKDIR /usr/src/app
# Document which port the application listens on
EXPOSE 3000
# Command to run the application
CMD ["index.js"]
# Note: Consider adding a HEALTHCHECK instruction if your app supports it