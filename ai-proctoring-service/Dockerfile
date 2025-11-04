FROM node:18-alpine

WORKDIR /app

# Install Python and build dependencies for AI libraries
RUN apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    cmake \
    openblas-dev \
    libpng-dev \
    jpeg-dev \
    tiff-dev \
    libwebp-dev

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Install Python dependencies for AI/ML
RUN pip3 install --no-cache-dir \
    numpy \
    opencv-python-headless \
    tensorflow \
    mediapipe \
    scikit-learn \
    pillow

# Copy source code
COPY . .

# Expose port
EXPOSE 5001

# Start the AI service
CMD ["node", "server.js"]