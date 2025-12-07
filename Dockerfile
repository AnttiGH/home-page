FROM node:lts-alpine AS builder

# Build the frontend (Vite) in a separate stage
WORKDIR /build

# Copy only frontend sources & package files for better cache
COPY public/package*.json ./public/
COPY public ./public

RUN cd public \
	&& npm install \
	&& npm run build


FROM node:lts-alpine

WORKDIR /usr/src/app

# Install server dependencies (production only)
COPY package*.json ./
RUN npm install --production

# Copy server sources
COPY api ./api
COPY .dockerignore ./

# Copy other repo files (if any) that the server needs
COPY package.json ./

# Copy built frontend from builder into bundle/
COPY --from=builder /build/public/dist ./bundle

ENV PORT=8080
EXPOSE 8080

CMD ["node", "api/index.js"]
