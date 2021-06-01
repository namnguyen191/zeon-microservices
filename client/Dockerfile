FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copying source files
COPY . .

# Running the app
CMD ["yarn", "dev"]