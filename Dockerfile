# Use an official Node runtime as a parent image. 
# Use a specific version!
# See: https://github.com/goldbergyoni/nodebestpractices#-89-use-explicit-image-reference-avoid-latest-tag
FROM node:19 AS build

WORKDIR /app/frontend

# Install node modules and cache them in 'build' image.
COPY ./frontend/package.json ./frontend/package-lock.json . 
RUN npm install

WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json . 
RUN npm install

FROM node:19

# Set the working directory within the container to '/app',
# both backend and frontend will be hosted in this directory.
WORKDIR /app

# Copy both backend and frontend folders into the container.
COPY . .

# Build the frontend.
WORKDIR /app/frontend
# Copy the cached node_modules.
COPY --from=build /app/frontend/node_modules ./node_modules

# Build frontend.
RUN npm run build

WORKDIR /app/backend
# Copy the cached node_modules.
COPY --from=build /app/backend/node_modules ./node_modules

# Set the command to start the Node server and serve the React app.
CMD ["npm", "run", "start"]

