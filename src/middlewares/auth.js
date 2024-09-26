// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  try {

    let token = req.headers['authorization'];
    if (!token) return res.status(401).send('Acesso negado!');

   
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send('Token inválido!');
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Token inválido!", cause: error.message });
  }
};

module.exports = { auth };
