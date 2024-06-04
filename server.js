import express from 'express'
import { connection } from './db/db.js'
import winston from 'winston'
import { routes } from './routes/index.js'
import db from './models/index.js'

const app = express()

const HOST = 'localhost'
const PORT = 5000

connection()

// Converte o valor recebido via body na requisição
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Drop and re-sync db.");
    initialPerfil();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

export function initialPerfil() {
  db.Perfil.create({
    id: 1,
    name: "usuario"
  });

  Role.create({
    id: 2,
    name: "moderador"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}



app.get('/', (req, res) => {
  res.send({
    message: 'Servidor no Ar!',
    status: 200
  })
})

//produtoRoute(app)
routes(app)
app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})