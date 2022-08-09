'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden_trabajo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orden_trabajo.belongsTo(models.Trabajo)
      Orden_trabajo.belongsTo(models.Estado)
      Orden_trabajo.belongsTo(models.Cliente)
      Orden_trabajo.belongsTo(models.Usuario)
      Orden_trabajo.belongsTo(models.Moto)

      // muchos a muchos Estado Orden_trabjo
      Orden_trabajo.belongsToMany(models.Estado, {
        through: 'Registo_cambios_estado'
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