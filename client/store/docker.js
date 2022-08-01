const BASE_URL = 'http://localhost:8000/api';

module.exports = {
  state: {
    containers: [],
    containersRunning: [],
    containersSideBar: [],
    info: {},
  },

  getters: {
    getContainer(state) {
      return state.containers;
    },

    getContainerRunning(state) {
      return state.containersRunning;
    },

    getInfo(state) {
      return state.info;
    },

    getContainerSideBar(state) {
      return state.containersSideBar;
    }
  },

  actions: {

    async getContainerSideBar({ commit }, status) {
      try {
        const { data } = await this.$axios.get(`${BASE_URL}/docker/containers?status=${status}`);
        commit('SET_CONTAINER_SIDEBAR', data);
      } catch (ex) {
        console.log(ex);
      }
    },

    async getContainerList({ commit }, status) {
      try {
        const { data } = await this.$axios.get(`${BASE_URL}/docker/containers?status=${status}`);
        status === 'all' ? commit('SET_CONTAINER_ALL', data) : commit('SET_CONTAINER_RUNNING', data);
      } catch (ex) {
        console.log(ex);
      }
    },

    async getInfo({ commit }) {
      try {
        const { data } = await this.$axios.get(`${BASE_URL}/docker/info`);
        commit('SET_INFO', data);
      } catch (ex) {
        console.log(ex);
      }
    },

    async getLogsStatic({ commit }, params) {
      try {
        const { data } = await this.$axios.get(`${BASE_URL}/docker/logs/${params.id}`);
        console.log(data);
      } catch (ex) {
        console.log(ex);
      }
    },
  },

  mutations: {

    SET_CONTAINER_RUNNING(state, value) {
      state.containersRunning = value;
    },

    SET_CONTAINER_ALL(state, value) {
      state.containers = value;
    },

    SET_INFO(state, value) {
      state.info = value;
    },

    SET_CONTAINER_SIDEBAR(state, value) {
      state.containersSideBar = value;
    }

  }
};
