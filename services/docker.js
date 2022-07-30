const Docker = require('dockerode');

const docker = new Docker();

exports.listAllContainers = ({
  status,
}) => new Promise((resolve, reject) => {
  try {
    const containers = docker.listContainers({
      filters: {
        status,
      },
    });
    resolve(containers);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
