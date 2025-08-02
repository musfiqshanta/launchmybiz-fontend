# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy built assets to NGINX's default public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
