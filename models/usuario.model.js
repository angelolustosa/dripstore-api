import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O nome do usuário é obrigatório.'
      },
      notEmpty: {
        msg: 'O nome do usuário não pode estar vazio.'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Use Sequelize literal for current timestamp
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Use Sequelize literal for current timestamp
  }
}, {
  timestamps: false, // Disable Sequelize default timestamps
  tableName: 'usuario'
});
