const { create, getbypost, deleteOne } = require('../controllers/commentController');
const router = require('express').Router();
const { isUserLogged } = require('../middlewares/middlewares');

router.post('/', isUserLogged, create);
router.get('/:id', isUserLogged, getbypost);
router.delete('/:id', isUserLogged, deleteOne)
module.exports = router;