const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ['id', 'nome', 'email']
    });
    res.json(usuarios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await User.findByPk(id, {
      attributes: ['id', 'nome', 'email']
    });

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.json(usuario);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).send('Nome, email e senha são obrigatórios');
    }

    const usuarioExistente = await User.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).send('Email já cadastrado');
    }

    const senhaEncriptada = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({ nome, email, senha: senhaEncriptada });
    res.json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome && !email && !senha) {
      return res.status(400).send('Informe ao menos um campo para atualizar');
    }

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    if (senha) {
      req.body.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    await usuario.destroy();
    res.send('Usuário deletado');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
