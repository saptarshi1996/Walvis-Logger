const Docker = require('dockerode');

let docker = new Docker();

exports.connectInstance = ({
  environment,
}) => new Promise((resolve, reject) => {
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
    resolve();
  } catch (ex) {
    reject(new Error(ex.stack));
  }
});

exports.disconnectInstance = () => new Promise((resolve, reject) => {
  try {
    docker = null;
    resolve();
  } catch (ex) {
    reject(new Error(ex.stack));
  }
});

exports.getInfo = () => new Promise(async (resolve, reject) => {
  try {
    const {
      Containers,
      ContainersRunning,
      ContainersStopped,
      Images,
      NCPU,
      MemTotal,
    } = await docker.info();
    resolve({
      container: Containers,
      running: ContainersRunning,
      stopped: ContainersStopped,
      image: Images,
      cpu: NCPU,
      memory: `${(MemTotal / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    });
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.listAllContainers = ({
  status,
}) => new Promise(async (resolve, reject) => {
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
      filters: {
        status: conditionList,
      },
    });

    const containers = containerList.map((container) => {
      const {
        Id,
        Image,
        Names,
        ImageID,
        State,
        Status,
      } = container;
      return {
        id: Id,
        image: Image,
        name: Names[0].substring(1, Names[0].length),
        imageId: ImageID,
        state: State,
        status: Status,
      };
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
    const container = await docker.getContainer(id).stats({
      stream: false,
    });
    resolve(container);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

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
