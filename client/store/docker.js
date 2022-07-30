const BASE_URL = 'http://localhost:8000'

module.exports = {
  state: {
    containers: [],
    containersRunning: [],
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
  },

  actions: {
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
        console.log(data);
        commit('SET_INFO', data);
      } catch (ex) {
        console.log(ex);
      }
    }
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
    }

  }
};
