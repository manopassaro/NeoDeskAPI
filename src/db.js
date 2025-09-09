const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'M@dmin123',  // a senha que você definiu
  database: 'NeoDeskDB'
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conectado ao MySQL!");
    conn.release();
  } catch (err) {
    console.error("❌ Erro na conexão:", err);
  }
}

testConnection();

module.exports = pool;