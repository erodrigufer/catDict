# Use an official Node runtime as a parent image. 
# Use a specific version!
# See: https://github.com/goldbergyoni/nodebestpractices#-89-use-explicit-image-reference-avoid-latest-tag
FROM node:21 AS build

# Install node modules and cache them in 'build' image.
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./ 
RUN npm clean-install 
WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm clean-install 

# -------------------------------------------------------------

FROM node:21-alpine

# Setup a system group and user to run the webapp,
# in order to avoid the security risk  of running 
# the backend as root.
RUN addgroup --system webapp \
    && adduser --system webapp --ingroup webapp

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

RUN chown -R root:webapp ./dist ./node_modules
RUN chmod -R 550 ./node_modules
RUN chmod -R 550 ./dist

EXPOSE 80

# TODO: Use other user rather than root!
# USER webapp

# Set the command to start the Node server and serve the React app.
CMD ["npm", "run", "start"]
