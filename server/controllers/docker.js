const dockerService = require('../services/docker');

exports.getInfo = async (_, res) => {
  try {
    const info = await dockerService.getInfo();
    return res.status(200).json(info);
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

    return res.status(200).json(containerList);
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};

exports.containerDetails = async (req, res) => {
  try {
    const containerDetails = await dockerService.getContainerDetails({
      id: req.params.id,
    });

    return res.status(200).json(containerDetails);
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
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
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};

exports.connectInstance = async (req, res) => {
  try {

    const { environment } = req.body

    await dockerService.connectInstance({
      environment,
    });

    console.log('connected');

    return res.status(200).json({})

  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};
