#use official node image as base image
FROM node:20-alpine 

#set working directory
WORKDIR /app/src/peopleDesk-api

# copy package.json and package-lock.json
COPY package*.json ./

#  install dependencies
RUN npm install 

# copy all src files 
COPY . .

# listen our container on port 8080 we need to expose it
EXPOSE 8080

# RUN our application
CMD ["npm","start"]