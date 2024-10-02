const { Router } = require('express');


// rotas
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const { auth } = require('../middlewares/auth');

// config rotas
const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'API funcionando!' });
});

router.use('/login', authRoutes);
router.use('/users', auth, userRoutes);

module.exports = router;