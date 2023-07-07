const router = require('express').Router();
const { register, login, verifyToken } = require('../controllers/userController');
const { isUserLogged } = require('../middlewares/middlewares');

router.post('/register', register);
router.post('/login', login);
router.get('/check', isUserLogged, verifyToken);

module.exports = router;