const Docker = require('dockerode');

const docker = new Docker();

exports.getInfo = () => new Promise(async (resolve, reject) => {
  try {
    const info = await docker.info();
    resolve(info);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.listAllContainers = ({
  status,
}) => new Promise(async (resolve, reject) => {
  try {
    const containers = await docker.listContainers({
      filters: {
        status,
      },
    });
    resolve(containers);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getContainerDetails = ({
  id,
}) => new Promise(async (resolve, reject) => {
  try {
    const container = await docker.getContainer(id);
    resolve(container);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.restartContainer = ({
  id,
}) => new Promise(async (resolve, reject) => {
  try {
    await docker.getContainer(id).restart();
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
