const Docker = require('dockerode');
const docker = new Docker();

exports.docker = docker;

exports.getAllContainers = () => new Promise(async (resolve, reject) => {
  try {
    const containerList = await docker.listContainers({
      filters: {
        status: ['running'],
      }
    });

    resolve(containerList.map(container => ({
      id: container.Id,
      name: container.Image,
    })))

  } catch (ex) {
    reject({
      message: ex.message,
    });
  }
});

exports.getContainerDetails = ({
  id,
}) => new Promise(async (resolve, reject) => {
  try {
    const container = await docker.getContainer(id);
    resolve(container);
  } catch (ex) {
    reject({
      message: ex.message,
    });
  }
});

exports.getContainerLogs = ({
  containerId,
  since,
  until,
}) => new Promise((resolve, reject) => {
  try {
    resolve(docker.getContainer(id).logs({
      id: containerId,
      since,
      until,
    }));
  } catch (ex) {
    reject({
      message: ex.message,
    });
  }
});
