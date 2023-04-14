# Pull in the official lightweight version of Node 12.
FROM node:16-alpine

# Create and change to the app directory.
WORKDIR /

COPY package.json .
COPY yarn.lock .

# Install production dependencies.
RUN yarn install --production

# Copy local codebase into the container image
COPY . .

# Start the api server
CMD [ "yarn", "start" ]