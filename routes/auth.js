const router = require('express').Router();

const authController = require('../controllers/auth');
const { authMiddleware } = require('../middlewares/auth');

router.post('/userLogin', authController.userLogin);
router.get('/userDetails', authMiddleware, authController.userDetails);

module.exports = router;
