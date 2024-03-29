'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Cliente pertenece a Rol
      Cliente.belongsTo(models.Rol)

      // Cliente tiene muchas ordenes de trabajo
      Cliente.hasMany(models.OrdenTrabajo)
    }
  }
  Cliente.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.BIGINT,
    },
    celular: {
      type: DataTypes.BIGINT
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "activo"
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
    modelName: 'Cliente',
    tableName: 'Cliente',
  });
  return Cliente;
};