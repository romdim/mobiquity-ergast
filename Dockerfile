FROM nginx:alpine

RUN apk --update add git nodejs && npm i -g npm@6.0.1

# It needs to be in a folder outside HOME or you get:
# Cannot read property 'config' of null
RUN mkdir -p /opt/app
WORKDIR /opt/app

# We just need package for dependencies first
COPY ./package.json ./package.json
RUN npm install

# Copy all needed files
COPY ./src ./src/

# Build the project and produce the dist folder
RUN node_modules/@angular/cli/bin/ng build --prod

# Move the dist files in the nginx serving point
RUN mv dist/* /usr/share/nginx/html/

EXPOSE 80