# Use Node.js version 20
FROM node:20

# Create the folder where the code will live inside the container
WORKDIR /usr/src/app

# Copy package files first to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Your backend likely runs on 5000 or 8000. Expose that port.
EXPOSE 5000

# Start the server
CMD ["npm", "start"]