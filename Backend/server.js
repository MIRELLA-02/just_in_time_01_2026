require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const autorRoutes = require("./src/routes/autorRoutes");
app.use("/autor", autorRoutes);

const produtoRoutes = require("./src/routes/produtoRoutes");
app.use("/produtos", produtoRoutes);

const movimentacaoRoutes = require("./src/routes/movimentacaoRoutes");
app.use("/movimentacoes", movimentacaoRoutes);

const porta = process.env.PORT_APP || 3000;

app.listen(porta, () => {
    console.log(`Online na porta ${porta}`);
});