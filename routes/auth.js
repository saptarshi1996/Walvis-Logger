const router = require('express').Router();

router.post('/userLogin', (req, res) => userLogin(req, res));

module.exports = router;
