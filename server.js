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
    iniciarPerfis();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const iniciarPerfis = async () => {
  const perfis = await db.perfil.findAll();
  //console.log('perfis:', perfis)

  // TODO testar usando o bulkCreate
  if (perfis.length === 0) {
    db.perfil.create({
      id: 1,
      nome: "usuario",
      codigo: 'USER'
    });

    db.perfil.create({
      id: 2,
      nome: "moderador",
      codigo: 'MOD'
    });

    db.perfil.create({
      id: 3,
      nome: "admin",
      codigo: 'ADMIN'
    });
  }

}



app.get('/', (req, res) => {
  res.send({
    message: 'Servidor no Ar!',
    status: 200
  })
})


routes(app)


app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})