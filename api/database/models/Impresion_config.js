'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Modelo para configuracion de impresion de ticket 
   * tendrá variables bool que determinarán
   * cuales datos se van a imprimir y cuales no
   */
  class Impresion_config extends Model {
    
    static associate(models) {
      // define association here

    }
  }
  Impresion_config.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orden_id: { 
      type: DataTypes.BOOLEAN
    },
    usuario: { 
      type: DataTypes.BOOLEAN
    },
    web: { 
      type: DataTypes.BOOLEAN
    },
    precio: { 
      type: DataTypes.BOOLEAN
    },
    entrega: { 
      type: DataTypes.BOOLEAN
    },
    trabajo: { 
      type: DataTypes.BOOLEAN
    },
    detalle: { 
      type: DataTypes.BOOLEAN
    },
    repuesto: { 
      type: DataTypes.BOOLEAN
    },
    marca: { 
      type: DataTypes.BOOLEAN
    },
    origen: { 
      type: DataTypes.BOOLEAN
    },
    observaciones: { 
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Impresion_config',
    tableName: 'Impresion_config',
  });
  return Impresion_config;
};