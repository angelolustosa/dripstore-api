import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Perfil = sequelize.define('perfil', {
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
        msg: 'O nome do perfil é obrigatório.'
      },
      notEmpty: {
        msg: 'O nome do perfil não pode estar vazio.'
      }
    }
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O codigo do perfil é obrigatório.'
      },
      notEmpty: {
        msg: 'O codigo do perfil não pode estar vazio.'
      }
    }
  }
}, {
  timestamps: false, // Disable Sequelize default timestamps
  tableName: 'perfil'
});