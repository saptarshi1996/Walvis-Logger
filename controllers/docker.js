const dockerService = require('../services/docker');

exports.getInfo = async (req, res) => {
  try {
    const info = await dockerService.getInfo();
    return res.status(200).json({
      data: info,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.listAllContainer = async (req, res) => {
  try {
    const { query: { status } } = req;
    const containerList = await dockerService.listAllContainers({
      status,
    });

    return res.status(200).json({
      data: containerList
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.containerDetails = async (req, res) => {
  try {
    const containerDetails = await dockerService.getContainerDetails({
      id: req.params.id,
    });

    return res.status(200).json({
      data: containerDetails,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.restartContainer = async (req, res) => {
  try {
    await dockerService.restartContainer({
      id: req.params.id,
    });
    return res.status(200).json({
      message: 'Container restarted successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
