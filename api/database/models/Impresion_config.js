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
    observaciones: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Impresion_config',
  });
  return Impresion_config;
};