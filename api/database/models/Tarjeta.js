'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Modelo para tener registro del estado actual y la OT actual de cada tarjeta
   * para una lectura rápida.
   * 
   * Cuando estado = libre OT = null/empty
   */
  class Tarjeta extends Model {
    
    static associate(models) {
      // Tarjeta.OrdenTrabajo pertenece a OrdenTrabajo
      Tarjeta.belongsTo(models.OrdenTrabajo)
      
      // Tarjeta.Estado pertenece a Estado
      Tarjeta.belongsTo(models.Estado);

      //Tarjeta tiene ids en la tabla Eventos_mqtt
      Tarjeta.hasMany(models.Eventos_mqtt
        ,{foreignKey:'id'}
        );
    }
  }
  Tarjeta.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING,
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
    modelName: 'Tarjeta',
    tableName: 'Tarjeta',
  });
  return Tarjeta;
};