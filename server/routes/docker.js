const router = require('express').Router();

const dockerController = require('../controllers/docker');

router.get('/info', dockerController.getInfo);
router.get('/containers', dockerController.listAllContainer);
router.get('/container/:id', dockerController.containerDetails);
router.get('/container/restart/:id', dockerController.restartContainer);

module.exports = router;
