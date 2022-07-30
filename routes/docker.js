const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

const dockerController = require('../controllers/docker');

router.get('/info', authMiddleware, dockerController.getInfo);
router.get('/containers', authMiddleware, dockerController.listAllContainer);
router.get('/container/:id', authMiddleware, dockerController.containerDetails);
router.get('/container/restart/:id', authMiddleware, dockerController.restartContainer);

module.exports = router;
