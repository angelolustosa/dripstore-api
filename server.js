import express from 'express'
import { connection } from './db/db.js'
const app = express()

const HOST = 'localhost'
const PORT = 5000

connection()

app.get('/', (req, res) => {
  res.send({
    message:'Servidor no Ar!' ,
    status: 200
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})