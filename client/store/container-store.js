module.exports = {
  state: {
    containerListResponse: {},
    containerStreamLogs: [],
    sseClientObject: null,
  },

  getters: {

    getContainerListResponse(state) {
      return state.containerListResponse;
    },

    getSseClientObject(state) {
      return state.sseClientObject;
    },

    getContainerStreamLogs(state) {
      return state.containerStreamLogs;
    }

  },

  actions: {

    async getContainerListAction({ commit }, registerObject) {
      try {

        const { data } = await this.$axios.get("/container_list", registerObject);
        console.log(data.Response.data);
        commit("setContainerListResponse", data.Response.data);

      } catch (ex) {
        console.log(ex.message);
      }
    },

    async getContainerLogsStream({ commit }, container) {
      try {

        const sseClient = await this._vm.$sse
          .create(`http://localhost:9999/stream/${container.containerId}?tail=${container.tail}`)
          .on("message", (msg) => {

            commit("setContainerStreamLogs", msg)
          
          })
          .on("error", (err) =>
            console.error("Failed to parse or lost connection:", err)
          )
          .connect()
          .catch((err) => console.error("Failed make initial connection:", err));

        commit("setSseClientObject", sseClient);

      } catch (ex) {
        console.log(ex.message);
      }
    },

    clearLogs({ commit }) {
      commit("setClearLogs");
    }

  },

  mutations: {

    setContainerListResponse(state, value) {
      state.containerListResponse = value;
    },

    setSseClientObject(state, value) {
      state.sseClientObject = value;
    },

    setContainerStreamLogs(state, value) {
      state.containerStreamLogs.push({
        created_at: new Date().toISOString(),
        message: value,
      });
    },

    setClearLogs(state) {
      state.containerStreamLogs = [];
    }

  }
};
