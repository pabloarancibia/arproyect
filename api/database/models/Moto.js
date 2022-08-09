'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // Moto pertenece a muchos Repuestos
      Moto.belongsToMany(models.Repuesto, {through: 'Repuesto_Moto'})

      Moto.hasMany(models.Orden_trabajo)
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