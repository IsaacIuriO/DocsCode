// DocumentoSchema.js

const { DataTypes, Model } = require("sequelize");

const sequelize = require("../../database/dbconfig");

class Documento extends Model {}

Documento.init(
{
    pergunta:
    {
        type: DataTypes.TEXT,
        allowNull: false
    },

    resposta:
    {
        type: DataTypes.TEXT("long"),
        allowNull: false
    },

    tipo:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    codigoUML:
    {
        type: DataTypes.TEXT("long"),
        allowNull: true
    }
},
{
    sequelize,
    modelName: "Documento",
    tableName: "documentos"
});

module.exports = Documento;
