<template>
  <div id="scrollArea" class="clusterize-scroll">
    <div id="contentArea" class="clusterize-content">
      <v-alert dense class="mb-0 ml-1" v-for="(log, i) in containerLogs" :key="i">
        <v-chip label class="mr-2">{{
          log.timeStamp
        }}</v-chip
        >{{ log.log }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import Clusterize from "clusterize.js";
import socketClient from "socket.io-client";

export default {
  data() {
    return {
      socketObject: null,
      socketId: null,
      containerLogs: [],
    };
  },

  mounted() {
    this.clusterize = new Clusterize({
      // rows: this.containerLogs,
      scrollId: "scrollArea",
      contentId: "contentArea",
    });
    console.log(this.clusterize);
  },

  async created() {
    await this.$store.dispatch("getContainerList", "running");
    await this.connectSocket();

    this.socketObject.on("connect", () => {
      this.socketId = this.socketObject.id;
      console.log(`Socket connected with id ${this.socketId}`);
    });

    this.socketObject.on("disconnect", () => {
      console.log("socket disconnected");
    });

    this.socketObject.on("sendLogs", (data) => {
      const payload = JSON.parse(data);

      // const alertDiv = `<v-alert dense class="mb-0 ml-1">
      //   <v-chip v-if="logsTimeStampVisible" label class="mr-2">
      //     ${payload.timeStamp}</v-chip
      //   >${payload.log}</v-alert>`;

      this.containerLogs.push(payload);
    });

    this.socketObject.emit(
      "fetchLogs",
      JSON.stringify({
        socketId: this.socketObject.id,
        containerId: this.$route.params.id,
      })
    );
  },

  methods: {
    connectSocket() {
      const socketUrl = "http://localhost:8000";
      this.socketObject = socketClient.connect(socketUrl, {
        transports: ["websocket"],
      });
    },
  },
};
</script>
