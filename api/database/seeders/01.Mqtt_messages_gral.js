'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
let mqttMessages = [];
let tarjetaNumber = 1;
for (let i = 1; i <= 20; i++) {
mqttMessages.push({
id: i,
topic: 'nodo/discriminar',
message: `tarjeta:${tarjetaNumber}, nodo:mostrador, estado:discriminar`,
createdAt: new Date(),
updatedAt: new Date()
});
i++;
mqttMessages.push({
id: i,
topic: 'nodo/cambiarestado',
message: `tarjeta:${tarjetaNumber}, nodo:proceso, estado:proceso`,
createdAt: new Date(),
updatedAt: new Date()
});
i++;
mqttMessages.push({
id: i,
topic: 'nodo/cambiarestado',
message: `tarjeta:${tarjetaNumber}, nodo:finalizado, estado:finalizado`,
createdAt: new Date(),
updatedAt: new Date()
});
i++;
mqttMessages.push({
id: i,
topic: 'nodo/discriminar',
message: `tarjeta:${tarjetaNumber}, nodo:mostrador, estado:discriminar`,
createdAt: new Date(),
updatedAt: new Date()
});
tarjetaNumber++;
}
await queryInterface.bulkInsert('Mqtt_messages_gral', mqttMessages, {});
},

down: async (queryInterface, Sequelize) => {
await queryInterface.bulkDelete('Mqtt_messages_gral', {
id: {
[Sequelize.Op.between]: [1, 20]
}
});
}
};