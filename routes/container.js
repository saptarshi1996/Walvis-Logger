const router = require('express').Router();

const containerController = require('../controllers/container');

router.get('/listContainers', containerController.listContainers);
router.get('/containerDetails/:id', containerController.getContainerDetails);

module.exports = router;
