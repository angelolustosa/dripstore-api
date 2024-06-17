
import db from "../models/index.js";
const Usuario = db.usuario;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    Usuario.findOne({
        where: {
            nome: req.body.nome
        }
    }).then(usuario => {
        if (usuario) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Email
        Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {
            if (usuario) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.perfis) {
        for (let i = 0; i < req.body.perfis.length; i++) {
            if (!db.PERFIS.includes(req.body.perfis[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.perfis[i]
                });
                return;
            }
        }
    }

    next();
};

export const verifySignUp = {
    checkDuplicateUsernameOrEmail, checkRolesExisted
};