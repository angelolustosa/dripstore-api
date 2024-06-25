import express from 'express'
import { produtoService } from '../services/produtos.service.js'
import { verifySignUp } from '../middleware/verifySignUp.js';
import { authService } from '../services/auth.service.js';

var routerAuth = express.Router()

routerAuth
    .post('/signup', authService.signup)
    /* .post('/signin', authService.signin)
    .post("/logout", authService.logout) */;


export default routerAuth;