'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden_Trabajo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orden_Trabajo.belongsTo(models.Trabajo)
      Orden_Trabajo.belongsTo(models.Estado)
      Orden_Trabajo.belongsTo(models.Cliente)
      Orden_Trabajo.belongsTo(models.Registro_Repuesto)
      Orden_Trabajo.belongsTo(models.Usuario)
      Orden_Trabajo.belongsTo(models.Moto)

      // muchos a muchos Estado Orden_trabjo
      Orden_Trabajo.belongsToMany(models.Estado, {
        through: 'Registo_cambios_estado'
      })


    }
  }
  Orden_Trabajo.init({
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
    modelName: 'Orden_Trabajo',
  });
  return Orden_Trabajo;
};