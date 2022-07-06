const Docker = require('dockerode');
const docker = new Docker();

exports.docker = docker;

exports.getAllContainers = () => new Promise((resolve, reject) => {
  try {
    resolve(docker.listContainers());
  } catch (ex) {
    reject({
      message: ex.message,
    });
  }
});

exports.getContainerDetails = ({
  id,
}) => new Promise((resolve, reject) => {
  try {
    resolve(docker.getContainer(id));
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
