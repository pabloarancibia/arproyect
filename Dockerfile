FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# copiar directorio actual dentro de contenedor actual
COPY . .

EXPOSE 3000

CMD [ "npm", "run dev" ]