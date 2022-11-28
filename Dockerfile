FROM node:lts-buster AS build
# Workdir
WORKDIR /usr/src/app
COPY package*.json ./
# Build dist, which must include dev tools
RUN npm install
COPY . .
RUN npm run build

# Build the runtime environment
FROM node:lts-buster AS run
WORKDIR /usr/bin/app
COPY --from=build --chown=node:node /usr/src/app/package*.json  ./
COPY --from=build --chown=node:node /usr/src/app/dist/ ./dist/
ENV NODE_ENV=production
RUN npm ci
USER node:node
CMD ["npm", "start"]
