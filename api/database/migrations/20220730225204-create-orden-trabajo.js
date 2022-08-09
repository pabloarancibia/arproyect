'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orden_Trabajos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      precio:{
        type: DataTypes.INTEGER
      },
      fecha_entrega_estimada:{
        type: DataTypes.DATE
      },
      detalle:{
        type: DataTypes.STRING
      },
      TrabajoId:{
        type: Sequelize.INTEGER,
        references:{model:'Trabajo', key:'id'}
      },
      EstadoId:{
        type: Sequelize.INTEGER,
        references:{model:'Estado', key:'id'}
      },
      ClienteId:{
        type: Sequelize.INTEGER,
        references:{model:'Cliente', key:'id'}
      },
      Registro_RepuestoId:{
        type: Sequelize.INTEGER,
        references:{model:'Registro_Repuesto', key:'id'}
      },
      UsuarioId:{
        type: Sequelize.INTEGER,
        references:{model:'Usuario', key:'id'}
      },
      MotoId:{
        type: Sequelize.INTEGER,
        references:{model:'Moto', key:'id'}
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orden_Trabajos');
  }
};