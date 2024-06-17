import { Sequelize } from "sequelize";
import { sequelize } from "../db/database.js";
import { Usuario } from "./usuario.model.js";
import { Perfil } from "./perfil.model.js";
import { Produto } from "./produto.model.js";

sequelize.authenticate().then(() => {
  console.log('[INFO] Connection has been established successfully.');
}).catch((error) => {
  console.error('[ERROR] Unable to connect to the database: ', error);
});

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

db.produto = Produto
db.usuario = Usuario
db.perfil = Perfil

db.perfil.belongsToMany(db.usuario, {
  through: "usuario_perfil"
});
db.usuario.belongsToMany(db.perfil, {
  through: "usuario_perfil"
});

db.PERFIS = ["usuario", "admin", "moderador"];

export default db;