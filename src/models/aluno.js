const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { type } = require('node:os');

const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
        },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
        },
    rg: {
        type: DataTypes.STRING,
        allowNull: false
        },
    telefone: {
        type: DataTypes.NUMBER,
        allowNull: false
        },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }   
})

module.exports = Aluno;
