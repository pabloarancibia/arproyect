'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert('Moto', [
{
id: 1,
marca: 'Honda',
modelo: 'CG Titán',
cilindrada:150,
anio: 2010,
observaciones:'modelo viejo, no es la new titan. 2000-2013',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 2,
marca: 'Yamaha',
modelo: 'YBR',
cilindrada:250,
anio: 2010,
observaciones:' ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 3,
marca: 'Guerrero',
modelo: 'Smash',
cilindrada:110,
anio: 2000,
observaciones:' ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 4,
marca: 'Suzuki',
modelo: 'AX100',
cilindrada:100,
anio: 1990,
observaciones:'Muy popular en Argentina. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 5,
marca: 'Zanella',
modelo: 'ZB',
cilindrada:110,
anio: 2015,
observaciones:'Bastante económica. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 6,
marca: 'Motomel',
modelo: 'B110',
cilindrada:110,
anio: 2010,
observaciones:' ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 7,
marca: 'Mondial',
modelo: 'LD110H',
cilindrada:110,
anio: 2019,
observaciones:'Económica y con buena potencia. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 8,
marca: 'Corven',
modelo: 'Energy',
cilindrada:110,
anio: 2021,
observaciones:'Cómoda y fácil de manejar. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 9,
marca: 'Gilera',
modelo: 'Smash',
cilindrada:110,
anio: 2018,
observaciones:'Ideal para la ciudad. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 10,
marca: 'Keeway',
modelo: 'Horse',
cilindrada:150,
anio: 2019,
observaciones:'Estilo retro. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
id: 11,
marca: 'Kawasaki',
modelo: 'Z400',
cilindrada:400,
anio: 2020,
observaciones:'Para los amantes de las motos deportivas. ',
createdAt: new Date(),
updatedAt: new Date()
},
{
    id: 12,
    marca: 'Honda',
    modelo: 'CB 190 R',
    cilindrada: 190,
    anio: 2015,
    observaciones: 'Moto naked de baja cilindrada con buena estabilidad y eficiencia. 2015-actualidad.',
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    id: 13,
    marca: 'Suzuki',
    modelo: 'Intruder 250',
    cilindrada: 250,
    anio: 2009,
    observaciones: 'Moto custom de baja cilindrada con buenos acabados y estabilidad en ruta. 2009-2013.',
    createdAt: new Date(),
    updatedAt: new Date()
},

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Moto',
        {id: {
            [Sequelize.Op.between]: [1, 13]
            }
    }, {});
  }
};
