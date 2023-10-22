FROM node:lts
WORKDIR /app

COPY ./* /app
RUN npm install

ENTRYPOINT [ "npm", "start" ]