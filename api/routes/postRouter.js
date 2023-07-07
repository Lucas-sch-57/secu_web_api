const router = require('express').Router();
const { isUserLogged } = require('../middlewares/middlewares');
const { create, all, myPosts, one, update, like, deleteOne } = require('../controllers/postController');

router.post('/', isUserLogged, create);
router.get('/', isUserLogged, all);
router.get('/my-posts', isUserLogged, myPosts);
router.get('/:id', isUserLogged, one);
router.patch('/:id', isUserLogged, update);
router.patch('/:id/like', isUserLogged, like);
router.delete('/:id', isUserLogged, deleteOne);
module.exports = router;