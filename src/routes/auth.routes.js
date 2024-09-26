const express = require('express');
const router = express.Router();
const {User}  = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ where: { email: email } });

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).send('Senha incorreta');
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user: {id: usuario.id, nome: usuario.nome, email: usuario.email}, token: token});
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;