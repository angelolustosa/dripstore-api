import { Op } from "sequelize";
import db from "../models/index.js";
const Usuario = db.usuario;
const Perfil = db.perfil;

import pkg from 'bcryptjs';
import { secret } from "../config/auth.config.js";
import jwt from "jsonwebtoken";
const { hashSync, compareSync } = pkg;

export const authService = {

    signup: (req, res) => {
        // Save User to Database
        Usuario.create({
            nome: req.body.nome,
            usuario: req.body.usuario,
            email: req.body.email,
            senha: hashSync(req.body.senha, 8)
        })
            .then(usuario => {
                if (req.body.perfis) {
                    Perfil.findAll({
                        where: {
                            nome: {
                                [Op.or]: req.body.perfis
                            }
                        }
                    }).then(perfis => {
                        usuario.addPerfil(perfis).then(() => {
                            res.send({ message: "User was registered successfully!" });
                        });
                    });
                } else {
                    // user role = 1
                    usuario.setPerfil([1]).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    },


    /*   async (req, res) => {
            // Save User to Database
            Usuario.create({
                nome: req.body.nome,
                usuario: req.body.usuario,
                email: req.body.email,
                senha: hashSync(req.body.senha, 8)
            })
                .then(usuario => {
                    if (req.body.perfis) {
                        Perfil.findAll({
                            where: {
                                nome: {
                                    [Op.or]: req.body.perfis
                                }
                            }
                        }).then(perfis => {
                            usuario.setPerfis(perfis).then(() => {
                                res.send({ message: "User was registered successfully!" });
                            });
                        });
                    } else {
                        // user role = 1
                        usuario.setRoles([1]).then(() => {
                            res.send({ message: "User was registered successfully!" });
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
 */
    signin: async (req, res) => {
        const usuario = await Usuario.findOne({
            where: {
                nome: req.body.nome
            }
        })

        try {
            if (!usuario) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = compareSync(
                req.body.senha,
                usuario.senha
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: usuario.id },
                secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            var authorities = [];
            usuario.getPerfils().then(perfis => {
                for (let i = 0; i < perfis.length; i++) {
                    authorities.push("PERFIL_" + perfis[i].nome.toUpperCase());
                }
                res.status(200).send({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    perfis: authorities,
                    accessToken: token
                });
            });
        } catch (error) {
            console.log(`error`, error);
            res.status(500).send({ message: error.message });
        }
    }
}