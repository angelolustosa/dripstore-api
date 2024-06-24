import express from 'express'
import { usuarioService } from '../services/usuario.service.js'
import { authJwt } from '../middleware/authJwt.js';

var routerUsuario = express.Router()

routerUsuario
    .post('/', [authJwt.verifyToken, authJwt.isAdmin], usuarioService.create)
    .get('/', [authJwt.verifyToken, authJwt.isAdmin], usuarioService.getAll)
    .get('/:id', usuarioService.getById)
    .put('/:id', usuarioService.update)
    .delete('/:id', usuarioService.delete)

    /* .get("/api/test/all", controller.allAccess)

    .get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    )

    .get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    )

    .get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    ); */



export default routerUsuario;