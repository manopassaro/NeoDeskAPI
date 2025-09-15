const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRouter = require('./users/routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
