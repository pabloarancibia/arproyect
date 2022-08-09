'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Usuarios del Sistema:
   * Personal administrativo de la empresa
   */
  class Usuario extends Model {
    
    static associate(models) {
      
      // Usuario pertenece a Rol
      Usuario.belongsTo(models.Rol)

      Usuario.hasMany(models.Orden_trabajo)
    }
  }
  Usuario.init({
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
    celular: {
      type: DataTypes.BIGINT
    },
    nombreusuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 30],
          message: "El nombre de Usuario debe ser entre 4 y 30 caracteres"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

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
    modelName: 'Usuario',
  });
  return Usuario;
};