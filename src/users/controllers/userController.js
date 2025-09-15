const pool = require('../../db');

// listar todos os usuários
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// criar um usuário
exports.create = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    res.send(`✅ Usuário criado com ID: ${result.insertId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// atualizar
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    await pool.query(
      'UPDATE Usuarios SET nome=?, email=?, senha=? WHERE id=?',
      [nome, email, senha, id]
    );
    res.send(`✅ Usuário ${id} atualizado com sucesso!`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// deletar
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Usuarios WHERE id=?', [id]);
    res.send(`✅ Usuário ${id} removido com sucesso!`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};