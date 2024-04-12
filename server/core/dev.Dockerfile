FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Install TypeScript
RUN npm install -g typescript

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run tsc in watch mode and nodemon when the container launches
CMD ["npm", "run", "watch"]