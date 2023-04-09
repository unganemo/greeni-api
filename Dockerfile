# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /greeni-api

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set the environment variable
ENV NODE_ENV=production

# Expose the port the application will listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]