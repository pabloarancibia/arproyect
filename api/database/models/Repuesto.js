'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repuesto extends Model {
    static associate(models) {
      // Repuesto pertenece a muchas Motos N:M
      Repuesto.belongsToMany(models.Moto, {through: 'Repuesto_Moto'})

      // Repuesto pertenece a muchas Ordenes de trabajo N:M
      Repuesto.belongsToMany(models.OrdenTrabajo, {
        through: 'Orden_Repuesto'
      })
      Repuesto.belongsTo(models.Origen)
    }
  }
  Repuesto.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medida: {
      type: DataTypes.INTEGER,
    },
    marca: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    cantidad: {
      type: DataTypes.INTEGER
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
    modelName: 'Repuesto',
    tableName: 'Repuesto',
  });
  return Repuesto;
};