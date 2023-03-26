const router = require('express').Router();

const wrapAsync = require('../middlewares/wrap-async');

const {
  getInfo,
  listAllContainer,
  containerDetails,
  restartContainer,
  disconnectInstance,
  connectInstance,
} = require('../controllers/docker');

router.get('/info', wrapAsync(getInfo));
router.get('/containers', wrapAsync(listAllContainer));
router.get('/container/:id', wrapAsync(containerDetails));
router.get('/container/restart/:id', wrapAsync(restartContainer));
router.get('/disconnect', wrapAsync(disconnectInstance));

router.post('/connect', wrapAsync(connectInstance));

module.exports = router;
