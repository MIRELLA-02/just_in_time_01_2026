const prisma = require("../data/prisma");

async function login(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        mensagem: "Informe o email."
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "Email não cadastrado."
      });
    }

    return res.json({
      mensagem: "Login realizado com sucesso.",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      mensagem: "Erro ao realizar login."
    });
  }
}

module.exports = {
  login
};