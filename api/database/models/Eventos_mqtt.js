'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * maneja eventos que el front deberá consultar
   * el campo is_active indica si el evento ya fue manejado o no
   */
  class Eventos_mqtt extends Model {
    static associate(models) {
      // Eventos.OrdenId pertenece a Orden_trabajo
      Eventos_mqtt.belongsTo(models.Orden_trabajo);

      //Eventos.TarjetaId pertenece a Tarjeta
      Eventos_mqtt.belongsTo(models.Tarjeta,{
        as: 'Tarjeta',foreignKey:'id'
      });
    }
  }
  Eventos_mqtt.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accion: {
      type: DataTypes.STRING
    },
    nodo: {
      type: DataTypes.STRING
    },
    observaciones: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Eventos_mqtt',
    tableName: 'Eventos_mqtt',
  });
  return Eventos_mqtt;
};