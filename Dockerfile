# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory within the container to /app
WORKDIR /app

COPY . .

WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app/backend
RUN npm install

# Expose port 3000 for the React app
EXPOSE 3000

# Set the command to start the Node server and serve the React app
CMD ["npm", "run", "start"]

