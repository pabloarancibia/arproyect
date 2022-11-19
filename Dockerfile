FROM node:latest

# ENV NODE_ENV=development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY api/package*.json ./

RUN npm install

# copiar directorio actual dentro de contenedor actual
COPY . .

EXPOSE 3000

VOLUME [ "/api/node_modules" ]

CMD [ "npm", "run", "dev" ]