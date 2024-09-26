const { Router } = require('express');


// rotas
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const { auth } = require('../middlewares/auth');

// config rotas
const router = Router();

router.use('/login', authRoutes);
router.use('/users', auth, userRoutes);

module.exports = router;