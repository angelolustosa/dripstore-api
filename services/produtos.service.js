import { Produto } from "../model/produto.model.js";

export const produtoService = {
    getAll: async (req, res) => {
        const produtos = await Produto.findAll({
            order: [['id', 'DESC']]
        });

        return res.status(200).json(produtos);
    },
    getById: async (req, res) => {
        const id = req.params.id
        const produto = await Produto.findByPk(id);

        if(!produto) {
           return res.status(404).json({
            message: `Produto id: ${id} não encontrado!`
           })
        }

        return res.status(200).json(produto);
    },
    create: async (req, res) => {
        const produto = req.body;
        const produtoBD = await Produto.create(produto);

        if(!produtoBD) {
           return res.status(404).json({
            data: produto,
            message: `Erro ao salvar o produto não encontrado!`
           })
        }

        return res.status(200).json(produtoBD);
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