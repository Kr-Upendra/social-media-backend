FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install 
CMD [ "node", "server.js" ]
RUN npm test
EXPOSE 3000