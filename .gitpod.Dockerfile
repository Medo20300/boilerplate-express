FROM gitpod/workspace-full

USER gitpod

# Install Node.js and Git
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs git

# Ensure you're in the correct directory
WORKDIR /workspace

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install --verbose || cat /root/.npm/_logs/*.log

# Expose the port your app uses (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
