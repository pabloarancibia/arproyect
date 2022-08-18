'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Relacion N:M Ordenes de Trabajo y Repuestos
   * una orden puede tener varios repuestos asociados
   * Esos repuestos pueden estar tmb en otra Orden, debido a que 
   * un registro de respuesto representa a varios en stock
   * y cada uno que este en stock puede tener varias ordenes
   */
  class Orden_Repuesto extends Model {
    static associate(models) {
      Orden_Repuesto.belongsTo(models.Repuesto, {
        foreignKey: 'RepuestoId',
        as: 'Repuesto'
      });
      Orden_Repuesto.belongsTo(models.Orden_trabajo, {
        foreignKey: 'OrdenId',
        as: 'Orden_trabajo'
      })
    }
  }
  Orden_Repuesto.init({
    RepuestoId: {
      type: DataTypes.INTEGER,
  },
    OrdenId: {
      type: DataTypes.INTEGER,
  },
  observaciones: {
    type: DataTypes.STRING
  },
  repuesto_en_stock: {
    type: DataTypes.BOOLEAN
  },
  is_active: {
    type: DataTypes.BOOLEAN
  }
  }, {
    sequelize,
    modelName: 'Orden_Repuesto',
  });
  return Orden_Repuesto;
};