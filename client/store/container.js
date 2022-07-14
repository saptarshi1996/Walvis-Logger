module.exports = {
  state: {
    logs: [],
    containers: [],
    dockerInfo: {},
    loadingLogs: false,
  },

  getters: {
    getContainerList(state) {
      return state.containers;
    },
    getAddLogs(state) {
      return state.logs;
    },
    getLoadingLogs(state) {
      return state.loadingLogs;
    },
    getDockerInfo(state) {
      return state.dockerInfo;
    },
  },

  actions: {
    clearAllLogs({ commit }) {
      commit('setClearAllLogs');
    },

    async listContainerAction({ commit }) {
      try {
        const response = await this.$axios.get("/container/listContainers", {
          headers: {
            "content-type": "application/json"
          },
        });
        commit("setContainerList", response.data);
      } catch (ex) {
        console.log(ex.message);
      }
    },

    async getDockerInfo({ commit }) {
      try {
        const response = await this.$axios.get('/container/getDockerInfo', {
          headers: {
            'content-type': 'application/json',
          }
        });
        commit('setDockerInfo', response.data)
      } catch (ex) {
        console.log(ex.message);
      }
    },

    async startLoadingLogs({ commit }) {
      commit('setStartLoadingLogs');
    },

    async addLogs({ commit }, data) {
      commit('setAddLogs', data);
    },
  },

  mutations: {
    setContainerList(state, value) {
      state.containers = value;
    },
    
    setAddLogs(state, value) {

      if (state.logs.length === 0) {
        console.log('stop loader false');
        state.loadingLogs = false;
      }

      if (value && value.log === '!!!!!stop!!!!!') {
        state.containers = state.containers.filter(container => container.id !== value.containerId);
        state.logs = [];
      } else {

        if (state.logs.length > 200) {
          console.log('remove first');
          state.logs.splice(0, 1);
        }
        state.logs.push(value);
      }
    },

    setClearAllLogs(state) {
      state.logs = [];
    },

    setStartLoadingLogs(state) {
      state.loadingLogs = true;
    },

    setDockerInfo(state, value) {
      state.dockerInfo = value;
    },
  }
};
