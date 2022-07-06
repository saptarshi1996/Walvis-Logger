const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/userLogin', authController.userLogin);
router.get('/userDetails', authController.userDetails);

module.exports = router;
