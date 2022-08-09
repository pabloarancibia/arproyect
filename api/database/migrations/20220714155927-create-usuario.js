'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING,
      },
      celular: {
        type: Sequelize.BIGINT
      },
      nombreusuario: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
  
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "activo"
  
      },
      RolId:{
        type: Sequelize.INTEGER,
        references:{model:'Rol', key:'id'}
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuario');
  }
};