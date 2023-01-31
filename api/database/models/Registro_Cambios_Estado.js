'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Asociacion N:M entre Estado y OrdenTrabajo
   * para registrar los cambios de estado
   */
  class Registro_Cambios_Estado extends Model {

    static associate(models) {
      // define association here
      Registro_Cambios_Estado.belongsTo(models.Estado,
        {
          foreignKey: 'EstadoId',
          as:'Estado'
        })
      Registro_Cambios_Estado.belongsTo(models.OrdenTrabajo,
        {
          foreignKey: 'OrdenTrabajoId',
          as:'OrdenTrabajo'
        })
    }
  }
  Registro_Cambios_Estado.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    EstadoId: {
      type: DataTypes.INTEGER,
  },
    OrdenTrabajoId: {
      type: DataTypes.INTEGER,
  },
    fecha: {
      type: DataTypes.DATE
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
    modelName: 'Registro_Cambios_Estado',
    tableName: 'Registro_Cambios_Estado',
  });
  return Registro_Cambios_Estado;
};