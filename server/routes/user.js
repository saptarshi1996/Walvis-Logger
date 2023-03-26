const router = require('express').Router();

const { userDetails } = require('../controllers/auth');

const wrapAsync = require('../middlewares/wrap-async');

router.get('/', wrapAsync(userDetails));

module.exports = router;
