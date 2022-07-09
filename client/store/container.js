module.exports = {
  state: {
    logs: [],
    containers: [],
  },

  getters: {
    getContainerList(state) {
      return state.containers;
    },
    getAddLogs(state) {
      return state.logs;
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
        commit("setContainerList", {
          message: ex.message,
        });
      }
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
      state.logs.push(value);
    },

    setClearAllLogs(state) {
      state.logs = [];
    }
  }
};
