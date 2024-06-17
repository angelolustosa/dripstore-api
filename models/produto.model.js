import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Produto = sequelize.define('produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome do produto é obrigatório.'
            },
            notEmpty: {
                msg: 'O nome do produto não pode estar vazio.'
            }
        }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desconto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    categoria: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    data_cadastro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    timestamps: true, // Add this line to enable the default timestamp columns
    createdAt: 'data_cadastro', // Map 'createdAt' to 'data_cadastro'
    updatedAt: false, // Disable 'updatedAt' column if you don't need it
    tableName: 'produto'
});