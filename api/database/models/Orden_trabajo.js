'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden_trabajo extends Model {
    
    static associate(models) {
      Orden_trabajo.belongsTo(models.Trabajo)
      Orden_trabajo.belongsTo(models.Estado)
      Orden_trabajo.belongsTo(models.Cliente)
      Orden_trabajo.belongsTo(models.Usuario)
      Orden_trabajo.belongsTo(models.Moto)

      // Orden_trabjo tiene muchos Estados N:M
      Orden_trabajo.belongsToMany(models.Estado, {
        through: 'Registo_cambios_estado'
      })

      // Orden de trabajo tiene muchos Repuestos N:M
      Orden_trabajo.belongsToMany(models.Repuesto, {
        through: 'Orden_Repuesto'
      })


    }
  }
  Orden_trabajo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    precio:{
      type: DataTypes.INTEGER
    },
    entrega:{
      type: DataTypes.INTEGER
    },
    fecha_entrega_estimada:{
      type: DataTypes.DATE
    },
    detalle:{
      type: DataTypes.STRING
    },
    tarjeta:{
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
    modelName: 'Orden_trabajo',
  });
  return Orden_trabajo;
};