'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eventos_mqtt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Eventos.OrdenId pertenece a orden_trabajo
      Eventos_mqtt.belongsTo(models.Orden_trabajo)
    }
  }
  Eventos_mqtt.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tarjeta: {
      type: DataTypes.STRING
    },
    accion: {
      type: DataTypes.STRING
    },
    estado_tarjeta: {
      type: DataTypes.STRING
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