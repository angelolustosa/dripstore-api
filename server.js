import express from 'express'
import { connection } from './db/db.js'
import { produtoRoute } from './routes/produtos.routes.js'
import winston from 'winston'

const app = express()

const HOST = 'localhost'
const PORT = 5000

connection()

// Converte o valor recebido via body na requisição
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({
    message:'Servidor no Ar!' ,
    status: 200
  })
})

produtoRoute(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})