'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repuesto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Repuesto pertenece a muchas Motos N:M
      Repuesto.belongsToMany(models.Moto, {through: 'Repuesto_Moto'})

      // Repuesto pertenece a muchas Ordenes de trabajo N:M
      Orden_trabajo.belongsToMany(models.Orden_trabajo, {
        through: 'Orden_Repuesto'
      })
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
      unique: true
    },
    medida: {
      type: DataTypes.INTEGER,
    },
    origen: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
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
  });
  return Repuesto;
};