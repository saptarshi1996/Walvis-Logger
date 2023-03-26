const {
  getInfo,
  listAllContainers,
  getContainerDetails,
  restartContainer,
  connectInstance,
  disconnectInstance,
} = require('../services/docker');

exports.getInfo = async () => {
  const info = await getInfo();
  return info;
};

exports.listAllContainer = async (req) => {
  const { query: { status } } = req;
  const containerList = await listAllContainers({
    status,
  });

  return containerList;
};

exports.containerDetails = async (req) => {
  const containerDetails = await getContainerDetails({
    id: req.params.id,
  });

  return containerDetails;
};

exports.restartContainer = async (req) => {
  const { id } = req.params;
  await restartContainer({ id });
  return {
    message: 'Container restarted successfully',
  };
};

exports.connectInstance = async (req) => {
  const { environment } = req.body;
  await connectInstance({ environment });
  return {
    message: 'Docker connected',
  };
};

exports.disconnectInstance = async () => {
  await disconnectInstance();
  return {
    message: 'Docker disconnected',
  };
};
