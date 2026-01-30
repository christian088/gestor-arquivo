const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { type } = require('node:os');


const Documento = sequelize.define('Documento', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      tipo: {
        type: DataTypes.STRING, // pdf, jpg, png, docx etc
        allowNull: false,
      },

      tamanho: {
        type: DataTypes.INTEGER, // bytes
        allowNull: false,
      },

      caminho: {
        type: DataTypes.STRING, // path ou URL
        allowNull: false,
      },

      categoria: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "geral",
      },

      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
     
})