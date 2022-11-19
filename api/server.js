/**
 * Configuracion principal de la API
 */
 const express = require('express');
 const app = express();
 const cors = require('cors');
 const { sequelize } = require('./database/models/index')
 
 //settings 
 const PORT = process.env.PORT;
 
 // Implementamos de que origen vamos a permitir que nos hagan request
 const corsOption = { origin: '*', optionSucessStatus: 200 };
 app.use(cors(corsOption));
 
 // Middlewares
 app.use(express.json());
 app.use(express.urlencoded({}));
 
 // Routes
 app.use(require('./routers/genRouter'));
 app.use('/auth',require('./routers/authRouter'));
 app.use('/ordentrabajo',require('./routers/ordentrabajoRouter'));
 app.use('/gen',require('./routers/genRouter'));
 //app.use('/otherRouter/',require('./routers/otherRouter'));

 const mqttCtrl = require('./controllers/mqttController');

 
 app.listen(PORT, function (req, res) {
     console.log('API corriendo en PUERTO:', PORT, ' Ver puerto en docker!');
 
     sequelize.authenticate().then(() => {
         console.log('Coexión a BASE DE DATOS establecida')
     })
 
 });

 // MQTT

 // mqtt config
    const mqtt = require('mqtt')
    const host = process.env.MQTT_SERVER
    const port = process.env.MQTT_PORT
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    
    // mqtt connect function
    const connectUrl = `mqtt://${host}:${port}`
    const mqtt_client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 3000,
    })
    
    // subscribe to topics
    const topic = process.env.MQTT_TOPIC_ALL;
    mqtt_client.on('connect', () => {
      console.log('mqtt client Connected')
      mqtt_client.subscribe([topic], () => {
        console.log(`API Subscribe to topic '${topic}'`)
      })
    })
    
    // publish test message
    // mqtt_client.on('connect', () => {
    //     mqtt_client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    //       if (error) {
    //         console.error(error)
    //       }
    //     })
    //   })

      // sub & print console message
      mqtt_client.on('message', (topic, payload, retain) => {
        
        try {
          //envio mensaje a coordinador
          mqttCtrl.mqtt_coordinator(topic,payload,retain, mqtt_client);

        } catch (error) {
          console.log('error al recibir mqtt: ', error);
          //error: enviar pub a nodo emisor
          // agregar nombre nodo emisor
          // topic_error = process.env.MQTT_TOPIC_PUB_ERROR
          // mqtt_client.publish(topic_error, 'error', { qos: 0, retain: false }, (error) => {
          //   if (error) {
          //     console.error(error)
          //   }
          // });
        }
      })
