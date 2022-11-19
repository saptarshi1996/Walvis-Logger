const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/auth');

router.post('/userLogin', authController.userLogin);
router.get('/userDetails', authMiddleware, authController.userDetails);

module.exports = router;
