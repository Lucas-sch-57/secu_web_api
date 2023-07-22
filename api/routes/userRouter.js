const router = require('express').Router();
const { register, login, verifyToken, updateUsername, updatePassword } = require('../controllers/userController');
const { isUserLogged } = require('../middlewares/middlewares');

router.patch('/username-change', isUserLogged, updateUsername);
router.put('/password-change', isUserLogged, updatePassword);
module.exports = router;