# Build stage
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Runtime stage
FROM gcr.io/distroless/nodejs22-debian12
COPY --from=build /app /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["index.js"]
