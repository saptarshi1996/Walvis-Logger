const router = require('express').Router();

const { userLogin } = require('../controllers/auth');

const wrapAsync = require('../middlewares/wrap-async');

router.post('/userLogin', wrapAsync(userLogin));

module.exports = router;
