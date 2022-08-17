'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // Estado tiene muchos
      Estado.hasMany(models.Orden_trabajo)
      Estado.hasMany(models.Tarjeta)

      // muchos a muchos Estado Orden_trabjo
      Estado.belongsToMany(models.Orden_trabajo, {
        through: 'Registo_cambios_estado'
      })
    }
  }
  Estado.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: { 
      type: DataTypes.STRING
    },
    detalle: {
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
    modelName: 'Estado',
  });
  return Estado;
};