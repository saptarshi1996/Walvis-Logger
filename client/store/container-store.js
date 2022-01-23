module.exports = {
  state: {
    containerListResponse: {},
    containerStreamLogs: [],
    containerStreamStats: {},
    sseClientObject: null,
    sseStatsClientObject: null,
    mode: "logs",
    streamLoading: false,
    firstLoaded: false,
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

    getStreamLoading(state) {
      return state.streamLoading;
    },

    getFirstLoaded(state) {
      return state.firstLoaded;
    },

  },

  actions: {

    async getContainerListAction({ commit }, registerObject) {
      try {

        const { data } = await this.$axios.get("/logger-server/container_list", registerObject);
        commit("setContainerListResponse", data.Response.data);

      } catch (ex) {
        console.log(ex.message);
      }
    },

    async exportContainerLogExport({ commit }, logObject) { 
      try { 

        const { id, since, until } = logObject;
        await this.$axios.get(`/logger-server/download-logs/${id}?format=json&since=${since}&until=${until}`);

      } catch (ex) { 
        console.log(ex.message);
      }
    },

    async getContainerStatsStream({ commit }, container) {
      try {

        const baseUrl = process.env.SERVER_BASE_URL;
        const sseClientObject = await this._vm.$sse
          .create(`${baseUrl}/logger-server/stats/${container.containerId}`)
          .on("message", (msg) => {
            if (msg)
              commit("setContainerStreamStats", msg);
          })
          .on("error", (err) => {
            console.error("Failed to parse or lost connection:", err);
            // close loader here.
            commit("setTriggerStreamLoader", false);
          })
          .connect()
          .catch((err) => {
            console.error("Failed make initial connection:", err);
            // close loader here.
            commit("setTriggerStreamLoader", false);
          });

        commit("setSseStatsClientObject", sseClientObject);

      } catch (ex) {
        console.log(ex.message);
      }
    },

    async getContainerLogsStream({ commit }, container) {
      try {

        const baseUrl = process.env.SERVER_BASE_URL;
        const sseClient = await this._vm.$sse
          .create(`${baseUrl}/logger-server/stream/${container.containerId}?tail=${container.tail}`)
          .on("message", (msg) => {
            if (msg)
              commit("setContainerStreamLogs", msg);
          })
          .on("error", (err) => {
            console.error("Failed to parse or lost connection:", err);
            // close loader here.
            commit("setTriggerStreamLoader", false);
          })
          .connect()
          .catch((err) => {
            console.error("Failed make initial connection:", err);
            // close loader here.
            commit("setTriggerStreamLoader", false);
          });

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
    },

    triggerStreamLoader({ commit }, value) {
      commit("setTriggerStreamLoader", value);
    },

    triggerFirstLoaded({ commit }, value) {
      commit("setFirstLoaded", value);
    },

    refreshAllData({ commit }) {
      commit("setRefreshAllData");
    },

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
      state.streamLoading = false;
    },

    setContainerStreamLogs(state, value) {
      state.containerStreamLogs.push({
        created_at: new Date().toLocaleString(),
        message: value,
      });
      state.streamLoading = false;
    },

    setClearLogs(state) {
      state.containerStreamLogs = [];
      state.containerStreamLogs = [];
      state.containerStreamStats = {};
      state.mode = "logs";
      state.streamLoading = false;
    },

    setMode(state, mode) {
      state.mode = mode;
    },

    setTriggerStreamLoader(state, value) {
      if (value) {
        state.containerStreamLogs = [];
        state.containerStreamStats = {};
      }
      state.streamLoading = value;
    },

    setFirstLoaded(state, value) {
      state.firstLoaded = value;
    },

    setRefreshAllData(state) {
      state.firstLoaded = false;
      state.containerStreamLogs = [];
      state.containerStreamStats = {};
      state.mode = "logs";
      state.streamLoading = false;
    },

  },
};
