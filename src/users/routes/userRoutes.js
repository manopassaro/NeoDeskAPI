const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/userController');
const logController = require ('../controllers/logController');

router.get('/', usuariosController.getAll);
router.post('/', usuariosController.create);
router.put('/:id', usuariosController.update);
router.delete('/:id', usuariosController.remove);
router.post('/login', logController.login);

module.exports = router;
