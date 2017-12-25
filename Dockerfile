FROM node:9.3.0-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 3000
CMD ["node", "./server/cluster"]
