FROM node:18
 
# Set the working directory in the container
WORKDIR /app
 
# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*
 
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
 
# Install the bot's dependencies
RUN npm install
 
# Copy the rest of the bot's files to the working directory
COPY . .
 
# Expose the port that your bot listens on (if applicable)
# EXPOSE 80
 
# Define the command to start your bot
CMD ["node", "index.js"]