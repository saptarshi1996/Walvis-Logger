const dockerService = require('../services/docker');

exports.listAllContainer = async (req, res) => {
  try {
    const {
      query: {
        status,
      },
    } = req;
    const containerList = await dockerService.listAllContainers({
      status,
    });

    return res.status(200).json(containerList);
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
