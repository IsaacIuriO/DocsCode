// Importa bibliotecas DataTypes e Model do Sequelize
const { DataTypes, Model } = require('sequelize');
// DATATYPES: STRING, INTEGER, BOOLEAN, DATE, FLOAT
// MODEL: permite criar uma classe que representa uma tabela no banco de dados

// Importa a configuração do banco de dados que a gente está usando
const sequelize = require('../database/dbconfig');

// Cria classe 'Usuario' que herda propriedades e métodos da classe Model
// Ele pode manipular a tabela 'users' no banco de dados
class Usuario extends Model{}

// Começa a configuração da tabela
Usuario.init(
{
    email:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail:true}
    },
    
    password:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    username:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    // dita como o Sequelize vai se conectar com o banco de dados e qual tabela acessar
    sequelize,
    modelName: 'Users',     
    tableName: 'users'
});

// Coloca o model 'Usuario' para fora do arquivo, para que outros arquivos (SERVICE) possam usar
module.exports = Usuario;
