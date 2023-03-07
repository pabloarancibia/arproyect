'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenTrabajo extends Model {
    
    static associate(models) {
      //OrdenTrabajo.X pertenece a X
      OrdenTrabajo.belongsTo(models.Trabajo)
      OrdenTrabajo.belongsTo(models.Estado)
      OrdenTrabajo.belongsTo(models.Cliente)
      OrdenTrabajo.belongsTo(models.Usuario)
      OrdenTrabajo.belongsTo(models.Moto)

      //OrdenTrabajo tiene ids en la tabla Eventos_mqtt
      OrdenTrabajo.hasMany(models.Eventos_mqtt);

      //OrdenTrabajo tiene id en la tabla Tarjeta
      OrdenTrabajo.hasMany(models.Tarjeta);

      // Orden_trabjo tiene muchos Cambios de Estado N:M
      OrdenTrabajo.belongsToMany(models.Estado, {
        through: 'Registo_cambios_estado'
      })

      // Orden de trabajo tiene muchos Repuestos N:M
      OrdenTrabajo.belongsToMany(models.Repuesto, {
        through: 'Orden_Repuesto'
      })
      // OrdenTrabajo.belongsTo(models.Repuesto)
      // OrdenTrabajo.hasMany(models.Repuesto)


    }
  }
  OrdenTrabajo.init({
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
      type: DataTypes.TEXT('long')
    },
    tarjeta:{
      type: DataTypes.STRING
    },
    ordenPapel:{
      type: DataTypes.STRING
    },
    informado:{
      type: DataTypes.BOOLEAN
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
    modelName: 'OrdenTrabajo',
    tableName: 'OrdenTrabajo',
  });
  return OrdenTrabajo;
};