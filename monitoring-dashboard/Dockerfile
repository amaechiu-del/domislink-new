FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the dashboard
RUN npm run build

# Expose port
EXPOSE 3001

# Start the dashboard
CMD ["npm", "start"]