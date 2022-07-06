import axios from 'axios';
import {
  useQuery,
} from 'react-query';

const agent = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  },
});

const api = {
  getContainerList: () => agent.get('/container/listContainers'),
};

function useGetContainerListQuery() {
  return useQuery(['containerList'], async () => {
    const response = await api.getContainerList();
    return response.data;
  })
}

export { useGetContainerListQuery };
