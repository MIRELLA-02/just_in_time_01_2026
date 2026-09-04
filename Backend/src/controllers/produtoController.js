const prisma = require("../data/prisma");

async function listarProdutos(req, res) {
    try {
        const produtos = await prisma.produto.findMany({
            orderBy: {
                nome: "asc"
            }
        });

        res.json(produtos);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar os produtos."
        });
    }
}

async function buscarProduto(req, res) {
    try {
        const id = Number(req.params.id);

        const produto = await prisma.produto.findUnique({
            where: {
                id: id
            }
        });

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        res.json(produto);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar produto."
        });
    }
}

async function cadastrarProduto(req, res) {
    try {
        const {
            nome,
            descricao,
            custo,
            estoque,
            estoqueMinimo
        } = req.body;

        if (
            !nome ||
            !descricao ||
            custo === undefined ||
            estoque === undefined ||
            estoqueMinimo === undefined
        ) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        if (
            Number(custo) < 0 ||
            Number(estoque) < 0 ||
            Number(estoqueMinimo) < 0
        ) {
            return res.status(400).json({
                mensagem: "Os valores não podem ser negativos."
            });
        }

        const produto = await prisma.produto.create({
            data: {
                nome: nome,
                descricao: descricao,
                custo: Number(custo),
                estoque: Number(estoque),
                estoqueMinimo: Number(estoqueMinimo)
            }
        });

        res.status(201).json(produto);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar produto."
        });
    }
}

async function editarProduto(req, res) {
    try {
        const id = Number(req.params.id);

        const {
            nome,
            descricao,
            custo,
            estoque,
            estoqueMinimo
        } = req.body;

        if (
            !nome ||
            !descricao ||
            custo === undefined ||
            estoque === undefined ||
            estoqueMinimo === undefined
        ) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        const produto = await prisma.produto.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                descricao: descricao,
                custo: Number(custo),
                estoque: Number(estoque),
                estoqueMinimo: Number(estoqueMinimo)
            }
        });

        res.json(produto);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao editar produto."
        });
    }
}

async function excluirProduto(req, res) {
    try {
        const id = Number(req.params.id);

        const movimentacao = await prisma.movimentacao.findFirst({
            where: {
                produtoId: id
            }
        });

        if (movimentacao) {
            return res.status(400).json({
                mensagem: "Esse produto possui movimentações e não pode ser excluído."
            });
        }

        await prisma.produto.delete({
            where: {
                id: id
            }
        });

        res.json({
            mensagem: "Produto excluído com sucesso."
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao excluir produto."
        });
    }
}

module.exports = {
    listarProdutos,
    buscarProduto,
    cadastrarProduto,
    editarProduto,
    excluirProduto
};