import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { secret } from "../config/auth.config.js";
const Usuario = db.usuario;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Nenhum token Informado!"
        });
    }

    jwt.verify(token,
        secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

const isAdmin = (req, res, next) => {
    Usuario.findByPk(req.userId).then(usuario => {
        usuario.getPerfils().then(perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i].nome === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requer acesso de Administrador!"
            });
            return;
        });
    });
};

const isModerator = (req, res, next) => {
    Usuario.findByPk(req.userId).then(usuario => {
        usuario.getPerfils().then(perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i].nome === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requer acesso de Moderador!"
            });
        });
    });
};

const isModeratorOrAdmin = (req, res, next) => {
    Usuario.findByPk(req.userId).then(usuario => {
        usuario.getPerfils().then(perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i].nome === "moderator") {
                    next();
                    return;
                }

                if (perfis[i].nome === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

export const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
};