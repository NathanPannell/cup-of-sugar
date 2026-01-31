FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the default Vite preview port
EXPOSE 4173

# Serve the application using Vite's preview command
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
