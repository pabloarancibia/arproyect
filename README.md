# Node.js + Express + Sequelize + MySQL. Inicial Environment

_Estructura inicial para desarrollar un proyecto de backend en Node.js con Express, Sequelize y MySQL.  
También he instalado JWT, Bcrypy y otras librerías útiles_

### Pre-requisitos 📋

_Instalar NPM y Nodejs_
  
* [Npm](https://www.npmjs.com/) - Gestión de paquetes  
* [Node](https://nodejs.org) - El framework
  
### Instalación 🔧

_Clonar este repositorio en una carpeta nueva (ej: backend)_  

  ##### MUY IMPORTANTE .!!  
Agregar a .gitignore el archivo api/.env  
  
  
_ ahora puedes agregar una nueva url con tu propio repositorio y hacer push. 
  
  #### Continuar con...  
_Verificar el package.json para corroborar las versiones de cada instalación  
_Si quieres cambiar la versión de algo puedes hacerlo ahora.!_  
_Sino puedes continuar y luego verificar con NPM Check Updates_  
  * [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) - NPM Check Updates  
  
```
npm i -g npm-check-updates
ncu -u
npm install  
```   
  
  
_Luego:
_Correr npm install para instalar paquetes 
_Configurar las variables de entorno en .env con los datos de tu BD (no olvides que tendras que agregar este archivo a .gitignore)_  
  

```
npm install
```
  

```
npm run dev
```
  
_Ahora ve a localhost:puerto para verificar.
  

  
  
_En la siguiente sección tienes la guía de como desarrollé este entorno de trabajo_


## Construido con 🛠️

* [Node](https://nodejs.org) - El framework
* [Express](https://expressjs.com/) - Infraestructura para nodejs
* [Sequelize](https://sequelize.org/) - ORM
* [Npm](https://www.npmjs.com/) - Gestión de paquetes
  
  
_GUÍA DE COMO REALIZAR LAS INSTALACIONES DE MANERA MANUAL_  🛠️

_Vamos a Instalar: Node, Express, Sequelize, Sequelize cli, JWT, Bcrypt, mysql._

_Creo carpeta inicial para el proyecto: ejemplo: …/backend/_  

```
mkdir backend
```

_No olvidar las instalaciones previas:_  
_Instalar NPM_
_Instalar Node_  
  
  
_Creo un nuevo proyecto npm:_  
_esto crea el archivo package.json_  
```
npm init -y
```  
  
_Express, JWT y Bcrypt, dotenv, cors, body-parser:_  
```
npm i express jsonwebtoken bcrypt dotenv cors body-parser
```
_Se instala:_
+ jsonwebtoken@8.5.1  
Para el Token  
  
+ express@4.17.2  
Para las rutas  
  
+ bcrypt@5.0.1  
Para encriptación de contraseñas  

+ dotenv@14.3.2  
Para variables de entorno  

+ cors@2.8.5  
Para las peticiones  

+ body-parser@1.19.1  
Para leer los datos HTTP POST  

_Instalamos nodemon sólo para entorno de desarrollo_  
```
npm i nodemon -D
```
  
_Se instala:_
+ nodemon@2.0.15  
Para reiniciar el server ante cambios en desarrollo
  
_Instalamos Sequelize_  
```
npm install sequelize
```
  
_Instala:_
+ sequelize@6.14.1  
ORM para la base de datos.  
  
  
_Instalamos el cli de sequelize_
```
npm install -g sequelize-cli
```  
_Instala:_
+ sequelize-cli@6.4.1  
  
    
_Instalamos Mysql:_
```
npm install mysql2
```  
_Instala:_
+ mysql2@2.3.3
  
  

_Inicializamos sequelize en nuestro proyecto, esto crea carpetas como models, migrations, seeders, etc.:_
```
npx sequelize-cli init
```  
  
_Movemos las carpetas dentro de una carpeta nueva: /database/_
  
  

_Archivos para variables de entorno y archivos de configuración:_
```
touch .env database/.sequelizerc server.js
```
  

_Seteamos en server.js los parámetros correspondientes (revisar archivo)_
  

_Routers_  
_Seteamos carpetas y archivos para agregar multiples files de routers_  
_Tendremos varios archivos con rutas._
```
(ver server.js y /routers)
```
```
seteo la primer ruta para get a / y para auth en gerRouter.js y authRouter.js
```  
  
  

_Configurar variables de entorno para acceso a BD_
```
en archivo .env, variables de acceso a bd y puerto, también variables de seguridad para usar luego en auth con bcrypt.
```  
  
    
_Configurar archivo sequelizerc,_
```
Se indican los path donde estará el archivo de configuración, models, seeders y migrations.   
```
    

_Creo archivo de conexión_ 
```
database/config/database.js 
```
```
parámetros de conexión apuntando a variables en .env
```
```
parámetros configuración en archivo database/models/index.js 
```
_Verificar principalmente las rutas._  
  
  

_Configurar package.json con nodemon_
```
"scripts": {  
    "dev": "nodemon server.js"  
  },  
```
  
   
_Compruebo ejecución de la api y conexión a base de datos._ 
```
npm run dev.  
```
  
_Creo carpetas: controllers, database y middlewares.

  
_No hacer este paso: Creo github con esqueleto inicial completo_
[pabloarancibia node_api](https://github.com/pabloarancibia/nodejs_api.git) 😊   

#### Para continuar
_Configura .gitignore, agrega .env_
_Crea tu repositorio en github y apunta a él  
_Haz el primer commit y push  
_Continuar con tu desarrollo… Por ejemplo: Primer modelo y migración en Sequelize._
  
  
## Autores ✒️
* **Pablo Arancibia** - [pabloarancibia](https://github.com/pabloarancibia)
