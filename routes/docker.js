const router = require('express').Router();

const dockerController = require('../controllers/docker');

router.get('/listAllContainers', dockerController.listAllContainer);

module.exports = router;
