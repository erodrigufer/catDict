# Use an official Node runtime as a parent image. 
# Use a specific version!
# See: https://github.com/goldbergyoni/nodebestpractices#-89-use-explicit-image-reference-avoid-latest-tag
FROM node:19 AS build

WORKDIR /app/frontend

# Install node modules and cache them in 'build' image.
COPY ./frontend/package.json ./frontend/package-lock.json . 
RUN npm clean-install --production

WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json . 
RUN npm clean-install --production

FROM node:19

# Copy the cached node_modules for both backend and frontend.
COPY --from=build /app .

# Set the working directory within the container to '/app',
# both backend and frontend will be hosted in this directory.
WORKDIR /app

# Copy both backend and frontend folders into the container.
COPY . .

# Build the frontend.
WORKDIR /app/frontend
RUN npm run build

WORKDIR /app/backend

# Set the command to start the Node server and serve the React app.
CMD ["npm", "run", "start"]

