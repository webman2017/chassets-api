FROM node:14 
COPY . /app
WORKDIR /app 
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 9143

CMD ["npm" , "start"]