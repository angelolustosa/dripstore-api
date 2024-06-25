import { Op } from "sequelize";
import db from "../models/index.js";
const Usuario = db.usuario;
const Perfil = db.perfil;

import pkg from 'bcryptjs';
import { secret } from "../config/auth.config.js";
import jwt from "jsonwebtoken";
const { hashSync, compareSync } = pkg;

export const authService = {

    signup: async (req, res) => {
        try {
            const { nome, email, senha, perfis } = req.body

            const usuario = await db.usuario.create({
                nome,
                email,
                senha: hashSync(senha, 8)
            })

            if (perfis.length > 0) {
                // Verifica se todos os perfis passados existem no banco
                const perfisDB = await db.perfil.findAll({
                    where: {
                        nome: {
                            [Op.in]: perfis
                        }
                    }
                })

                if (perfisDB) {
                    const usuarioPerfil = await usuario.addPerfils(perfisDB)
                    res.status(201).json({
                        msg: `Usuário ${usuario.nome} cadastrado com Sucesso!`,
                        data: usuarioPerfil
                    })
                }
            }
        } catch (error) {
            console.log(`error`, error);
            res.status(500).json({ msg: "Erro ao cadastrar usuário", error: error });
        }

    },
    signin: async (req, res) => {

    },
    logout: async (req, res) => {

    },

}