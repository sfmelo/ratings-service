FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV LISTEN_PORT 8080
EXPOSE 8080
CMD ["npm", "start"]