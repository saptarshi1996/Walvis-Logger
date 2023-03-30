const Docker = require('dockerode');

let docker = new Docker();

exports.connectInstance = ({ environment }) => {
  try {
    switch (environment) {
      case 'LOCAL': {
        docker = new Docker();
        break;
      }
      default: {
        docker = new Docker();
        break;
      }
    }
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(new Error(ex.stack));
  }
};

exports.disconnectInstance = async () => {
  try {
    docker = null;
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(new Error(ex.stack));
  }
};

exports.getInfo = async () => {
  try {
    const {
      Containers,
      ContainersRunning,
      ContainersStopped,
      Images,
      NCPU,
      MemTotal,
    } = await docker.info();
    return Promise.resolve({
      container: Containers,
      running: ContainersRunning,
      stopped: ContainersStopped,
      image: Images,
      cpu: NCPU,
      memory: `${(MemTotal / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    });
  } catch (ex) {
    return Promise.reject(new Error(ex.message));
  }
};

exports.listAllContainers = async ({ status }) => {
  try {
    let conditionList = [];
    if (!status || (status && status === 'running')) {
      conditionList = ['running'];
    } else if (status === 'all') {
      conditionList = [
        'created',
        'restarting',
        'running',
        'removing',
        'paused',
        'exited',
        'dead',
      ];
    }

    const containerList = await docker.listContainers({
      filters: { status: conditionList }
    });

    const containers = containerList.map((container) => ({
      id: container.Id,
      image: container.Image,
      name: container.Names[0].substring(1, container.Names[0].length),
      imageId: container.ImageID,
      state: container.State,
      status: container.Status,
    }));
    return Promise.resolve(containers);
  } catch (ex) {
    return Promise.reject(new Error(ex.message));
  }
};

exports.getContainerDetails = async ({ id }) => {
  try {
    const container = await docker.getContainer(id).stats({
      stream: false,
    });
    return Promise.resolve(container);
  } catch (ex) {
    return Promise.reject(new Error(ex.message));
  }
};

exports.getContainer = async ({ id }) => {
  try {
    const container = await docker.getContainer(id);
    return Promise.resolve(container);
  } catch (ex) {
    return Promise.reject(new Error(ex.message));
  }
};

exports.restartContainer = async ({ id }) => {
  try {
    await docker.getContainer(id).restart();
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(new Error(ex.message));
  }
};
