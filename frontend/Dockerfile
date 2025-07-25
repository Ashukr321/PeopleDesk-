# configure base image 
FROM node:20-alpine
# set workDir
WORKDIR /app/src/peopleDesk-frontend

# copy package.json and package.lock.json 
COPY package*.json ./

# install all dependencies 
RUN npm install 

# copy all src file 
COPY . . 
# declare port 
ARG FRONTEND_PORT
# set env variable 
ENV FRONTEND_PORT=${FRONTEND_PORT}
# expose port 
EXPOSE 3000
# Run application 
CMD ["npm","run","dev"]