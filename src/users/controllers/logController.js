const pool = require('../../db');

// src/users/controllers/userController.js

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).send("Email e senha são obrigatórios");
  }

  try {
    // const pool = require("../../db");  ou como você exportou sua conexão MySQL
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length === 0) {
      return res.status(401).send("Usuário ou senha incorretos");
    }

    res.send({
      message: "Login realizado com sucesso",
      user: rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};
