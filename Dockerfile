FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies first for better caching
COPY package*.json ./
# Use npm install to work without a package-lock.json file; keeps image small by installing only prod deps
RUN npm install --production

# Copy source
COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["node", "src/index.js"]
