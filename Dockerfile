# Use an official Node runtime as a parent image
FROM node:10-alpine

# Set the working directory to /app/frontend
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files to the container.
COPY ./frontend/ .

# Install dependencies.
RUN npm install

RUN npm run build

WORKDIR /app/backend

COPY ./backend .

RUN tsc

# Expose port 3000 for the React app
EXPOSE 3000

# Set the command to start the Node server and serve the React app
CMD ["npm", "run", "start"]

