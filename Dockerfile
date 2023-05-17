# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory within the container to '/app',
# both backend and frontend will be hosted in this directory.
WORKDIR /app

# Copy both backend and frontend folders into the container.
COPY . .

# Install all required node modules for the frontend and 
# build the frontend.
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Install the node modules required for the backend.
WORKDIR /app/backend
RUN npm install

EXPOSE 80

# Set the command to start the Node server and serve the React app.
CMD ["npm", "run", "start"]

