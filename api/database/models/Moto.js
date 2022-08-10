'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Motocicletas:
   * ej: Honda CG Titán 150 
   */
  class Moto extends Model {
    
    static associate(models) {
      
      // Moto tiene muchas ordenes de trabajo
      Moto.hasMany(models.Orden_trabajo)
      
      // Moto pertenece a muchos Repuestos N:M
      Moto.belongsToMany(models.Repuesto, {through: 'Repuesto_Moto'})

    }
  }
  Moto.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    marca: {
      type: DataTypes.STRING
    },
    modelo: {
      type: DataTypes.STRING
    },
    cilindrada: {
      type: DataTypes.INTEGER
    },
    año: {
      type: DataTypes.INTEGER
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
    modelName: 'Moto',
  });
  return Moto;
};