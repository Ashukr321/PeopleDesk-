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

# declare build time arguments 
ARG PORT
ARG MONGO_URI
ARG DB_NAME

# set env variables 
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV DB_NAME=${DB_NAME}

# listen our container on port 8080 we need to expose it
EXPOSE 8080

# RUN our application
CMD ["npm","start"]