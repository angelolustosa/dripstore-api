import express from 'express'
import { usuarioService } from '../services/usuario.service.js'

var routerUsuario = express.Router()

routerUsuario
    .post('/', usuarioService.create)
    .get('/', usuarioService.getAll)
    .get('/:id', usuarioService.getById)
    .put('/:id', usuarioService.update)
    .delete('/:id', usuarioService.delete)

export default routerUsuario;