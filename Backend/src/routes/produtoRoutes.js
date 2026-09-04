const express = require("express");

const router = express.Router();

const produtoController = require("../controllers/produtoController");

router.get("/", produtoController.listarProdutos);

router.get("/:id", produtoController.buscarProduto);

router.post("/", produtoController.cadastrarProduto);

router.put("/:id", produtoController.editarProduto);

router.delete("/:id", produtoController.excluirProduto);

module.exports = router;