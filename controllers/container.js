const dockerService = require('../services/dockerode');

exports.listContainers = async (req, res) => {
  try {
    const containers = await dockerService.getAllContainers();
    return res.status(200).json(containers);
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    })
  }
};

exports.getContainerDetails = async (req, res) => {
  try {
    const container = await dockerService.getContainerDetails({
      id: req.params.id,
    });
    return res.status(200).json(container);
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    })
  }
};
