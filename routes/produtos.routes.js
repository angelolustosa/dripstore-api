import express from 'express'
import { produtoService } from '../services/produtos.service.js'

export const produtoRoute = (app) => {
    var route = express.Router()

    route.get('/', produtoService.getAll);
    route.get('/:id', produtoService.getById);

    app.use('/api/produto', route)
}