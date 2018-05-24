FROM nginx:1.14-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN apk --update add git nodejs && npm i -g npm@6.0.1

# It needs to be in a folder outside HOME or you get:
# Cannot read property 'config' of null
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Copy the nginx config file
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copye end to end test files
COPY ./e2e ./e2e/

# Angular, TS and Service Worker configs
COPY ./angular.json ./angular.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./ngsw-config.json ./ngsw-config.json

# Package for dependencies
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

# Copy all needed files
COPY ./src ./src/

# Build the project and produce the dist folder
RUN node_modules/@angular/cli/bin/ng build --prod --base-href '/'

# Move the dist files in the nginx serving point
RUN mv dist/* /usr/share/nginx/html/

EXPOSE 80