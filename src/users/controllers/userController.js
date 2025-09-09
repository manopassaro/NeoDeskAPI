const { poolPromise, sql } = require('../../db');

// GET todos usuários
exports.getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Usuario');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST novo usuário
exports.create = async (req, res) => {
  const { nome, email, senha, tipo_acesso } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('nome', sql.VarChar, nome)
      .input('email', sql.VarChar, email)
      .input('senha', sql.VarChar, senha)
      .input('tipo_acesso', sql.VarChar, tipo_acesso)
      .query('INSERT INTO Usuarios (nome, email, senha, tipo_acesso) VALUES (@nome, @email, @senha, @tipo_acesso)');
    res.send('Usuário criado com sucesso!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// PUT para atualizar usuário
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo_acesso } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('nome', sql.VarChar, nome)
      .input('email', sql.VarChar, email)
      .input('senha', sql.VarChar, senha)
      .input('tipo_acesso', sql.VarChar, tipo_acesso)
      .query('UPDATE Usuarios SET nome=@nome, email=@email, senha=@senha, tipo_acesso=@tipo_acesso WHERE id_usuario=@id');
    res.send('Usuário atualizado com sucesso!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE para remover usuário
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Usuarios WHERE id_usuario=@id');
    res.send('Usuário deletado com sucesso!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
