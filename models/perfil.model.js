import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const perfilModel = (sequelize) => {
  const Perfil = sequelize.define('perfil', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O codigo do usuário é obrigatório.'
        },
        notEmpty: {
          msg: 'O codigo do usuário não pode estar vazio.'
        }
      }
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
    }
  }, {
    timestamps: false, // Disable Sequelize default timestamps
    tableName: 'perfil'
  });

  return Perfil;
}

