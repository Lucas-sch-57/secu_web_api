const { create, getbypost } = require('../controllers/commentController');
const router = require('express').Router();
const { isUserLogged } = require('../middlewares/middlewares');

router.post('/', isUserLogged, create);
router.get('/:id', isUserLogged, getbypost);

module.exports = router;