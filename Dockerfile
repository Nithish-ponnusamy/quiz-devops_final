# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy built React files into the container
COPY build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
