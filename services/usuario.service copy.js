/* import { Produto } from "../models/produto.model.js";
import { Usuario } from "../models/usuario.model.js"; */

import db from "../models/index.js";
const Produto = db.produto;
const Usuario = db.usuario;

import pkg from 'bcryptjs';
const { hash } = pkg;

export const usuarioService = {
    create: async (req, res) => {
        const { nome, email, senha } = req.body;

        const usuario = await Usuario.findOne({
            where: {
                email: email
            }
        })

        if (usuario) {
            return res.status(404).json(`Usuário já cadastrado`);
        }

        try {
            const passHash = await hash(senha, 8)
            const user = { nome: nome, email: email, senha: passHash }

            console.log('user:', user)
            const usuarioBD = await Usuario.create(user);

            return res.status(200).json(usuarioBD);
        } catch (error) {
            res.status(400).send({
                message: `Erro ao cadastrar o usuário`,
                error: error
            })
        }
    },
    getAll: async (req, res) => {
        const produtos = await Usuario.findAll({
            order: [['id', 'DESC']]
        });

        return res.status(200).json(produtos);
    },
    getById: async (req, res) => {
        const id = req.params.id
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                message: `Produto id: ${id} não encontrado!`
            })
        }

        return res.status(200).json(produto);
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const [rowsUpdated, [produtoBD]] = await Produto.update(req.body, {
                where: { id: id }
            });

            if (produtoBD) {
                //const updatedProduto = await Produto.findByPk(id);
                return res.status(200).json(produtoBD);
            } else {
                return res.status(404).json({ message: `Produto id: ${id} não encontrado!` });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar o produto", error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await Produto.destroy({
                where: { id: id }
            });

            if (deleted) {
                return res.status(204).json({ message: `Produto id: ${id} deletado com sucesso!` });
            } else {
                return res.status(404).json({ message: `Produto id: ${id} não encontrado!` });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar o produto", error: error.message });
        }
    }
}