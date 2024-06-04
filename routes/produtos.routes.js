import express from 'express'
import { produtoService } from '../services/produtos.service.js'

var routerProduto = express.Router()

routerProduto
    .get('/', produtoService.getAll)
    .get('/:id', produtoService.getById)
    .post('/', produtoService.create)

export default routerProduto;