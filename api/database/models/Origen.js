'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Modelo para origen de repuestos
   * ej: Argentina, Brasil, China, Taiwan, Japon
   */
  class Origen extends Model {
    static associate(models) {
      // Origen tiene muchos Repuestos
      Origen.hasMany(models.Repuesto);
    }
  }
  Origen.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pais: {
      type: DataTypes.STRING
    },
    descripcion: {
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
    modelName: 'Origen',
  });
  return Origen;
};