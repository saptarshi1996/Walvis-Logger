const Docker = require('dockerode');
const docker = new Docker();

const getAllContainers = () => new Promise((resolve, reject) => {
  return docker.listContainers();
});

const getContainerDetails = ({
  id,
}) => new Promise((resolve, reject) => {

});
