const router = require('express').Router();

const dockerController = require('../controllers/docker');

router.get('/info', dockerController.getInfo);
router.get('/containers', dockerController.listAllContainer);
router.get('/container/:id', dockerController.containerDetails);
router.get('/container/restart/:id', dockerController.restartContainer);
router.get('/disconnect', dockerController.disconnectInstance);
router.get('/check', dockerController.checkConnection);

router.post('/connect', dockerController.connectInstance);

module.exports = router;
