const prisma = require("../data/prisma");

async function cadastrarMovimentacao(req, res) {
    try {
        const {
            produtoId,
            usuarioId,
            tipo,
            quantidade,
            data
        } = req.body;

        if (
            !produtoId ||
            !usuarioId ||
            !tipo ||
            !quantidade ||
            !data
        ) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        if (tipo !== "pedido" && tipo !== "fabricado") {
            return res.status(400).json({
                mensagem: "Tipo de movimentação inválido."
            });
        }

        if (Number(quantidade) <= 0) {
            return res.status(400).json({
                mensagem: "A quantidade deve ser maior que zero."
            });
        }

        const produto = await prisma.produto.findUnique({
            where: {
                id: Number(produtoId)
            }
        });

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(usuarioId)
            }
        });

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        let novoEstoque = produto.estoque;

        if (tipo === "fabricado") {
            novoEstoque += Number(quantidade);
        }

        if (tipo === "pedido") {

            if (Number(quantidade) > produto.estoque) {
                return res.status(400).json({
                    mensagem: "Não há estoque suficiente."
                });
            }

            novoEstoque -= Number(quantidade);
        }

        const movimentacao = await prisma.$transaction(async (banco) => {

            await banco.produto.update({
                where: {
                    id: Number(produtoId)
                },
                data: {
                    estoque: novoEstoque
                }
            });

            return await banco.movimentacao.create({
                data: {
                    tipo: tipo,
                    quantidade: Number(quantidade),
                    data: new Date(data),
                    produtoId: Number(produtoId),
                    usuarioId: Number(usuarioId)
                }
            });
        });

        let estoqueBaixo = false;

        if (
            tipo === "pedido" &&
            novoEstoque < produto.estoqueMinimo
        ) {
            estoqueBaixo = true;
        }

        res.status(201).json({
            mensagem: "Movimentação registrada com sucesso.",
            movimentacao: movimentacao,
            estoqueAtual: novoEstoque,
            estoqueBaixo: estoqueBaixo
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao registrar movimentação."
        });
    }
}

async function listarMovimentacoes(req, res) {
    try {
        const movimentacoes = await prisma.movimentacao.findMany({
            include: {
                produto: true,
                usuario: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            },
            orderBy: {
                data: "desc"
            }
        });

        res.json(movimentacoes);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar movimentações."
        });
    }
}

module.exports = {
    cadastrarMovimentacao,
    listarMovimentacoes
};