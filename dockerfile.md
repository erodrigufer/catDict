Here's an example Dockerfile to deploy a React SPA with a Node backend:

```
# Use an official Node runtime as a parent image
FROM node:10-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Set the command to start the Node server and serve the React app
CMD ["npm", "start"]
```

This assumes that your Node backend is set up to serve the React app as a static file. If you need to configure your Node server differently, you'll need to modify the `CMD` line accordingly.
