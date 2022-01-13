module.exports = {
  state: {
    containerListResponse: {},
    containerStreamLogs: [],
    containerStreamStats: {},
    sseClientObject: null,
    sseStatsClientObject: null,
    mode: "logs",
  },

  getters: {

    getContainerListResponse(state) {
      return state.containerListResponse;
    },

    getSseClientObject(state) {
      return state.sseClientObject;
    },

    getSseStatsClientObject(state) {
      return state.sseStatsClientObject;
    },

    getContainerStreamLogs(state) {
      return state.containerStreamLogs;
    },

    getContainerStreamStats(state) { 
      try {
        return JSON.parse(state.containerStreamStats);
      } catch (ex) {
        return {};
      }
    },

    getMode(state) {
      return state.mode;
    },

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

    async getContainerStatsStream({ commit }, container) {
      try {

        const sseClientObject = await this._vm.$sse
        .create(`http://localhost:9999/stats/${container.containerId}`)
        .on("message", (msg) => {
          
          commit("setContainerStreamStats", msg);

        })
        .on("error", (err) =>
          console.error("Failed to parse or lost connection:", err)
        )
        .connect()
        .catch((err) => console.error("Failed make initial connection:", err));

        commit("setSseStatsClientObject", sseClientObject);

      } catch (ex) {
        console.log(ex.message);
      }
    },

    async getContainerLogsStream({ commit }, container) {
      try {

        const sseClient = await this._vm.$sse
          .create(`http://localhost:9999/stream/${container.containerId}?tail=${container.tail}`)
          .on("message", (msg) => {

            commit("setContainerStreamLogs", msg);
          
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
    },

    triggerMode({ commit }, mode) { 
      commit("setMode", mode);
    }

  },

  mutations: {

    setSseStatsClientObject(state, value) {
      state.sseStatsClientObject = value;
    },

    setSseClientObject(state, value) {
      state.sseClientObject = value;
    },

    setContainerListResponse(state, value) {
      state.containerListResponse = value;
    },

    setContainerStreamStats(state, value) {
      state.containerStreamStats = value;
    },

    setContainerStreamLogs(state, value) {
      state.containerStreamLogs.push({
        created_at: new Date().toISOString(),
        message: value,
      });
    },

    setClearLogs(state) {
      state.containerStreamLogs = [];
    },

    setMode(state, mode) {
      state.mode = mode;
    },

  }
};
