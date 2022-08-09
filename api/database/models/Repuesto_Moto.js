'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Modelo de Asociacion n:m Repuestos y Motos
   * a que motos les va este repuesto
   */
  class Repuesto_Moto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Repuesto_Moto.belongsTo(models.Repuesto, {
        foreignKey: 'RepuestoId',
        as: 'Repuesto'
      });
      Repuesto_Moto.belongsTo(models.Moto, {
        foreignKey: 'MotoId',
        as: 'Moto'
      })
    }
  }
  Repuesto_Moto.init({
    
    RepuestoId: {
      type: DataTypes.INTEGER,
  },
    MotoId: {
      type: DataTypes.INTEGER,
  },
  is_active: {
    type: DataTypes.BOOLEAN
  },
  }, {
    sequelize,
    modelName: 'Repuesto_Moto',
  });
  return Repuesto_Moto;
};