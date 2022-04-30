FROM node:16
# Workdir
WORKDIR /usr/src/app
COPY package*.json ./
# Including dev tools
RUN npm install
COPY . .
RUN npm run build
# Copy dist to 
# EXPOSE 8080
CMD ["npm", "start"]