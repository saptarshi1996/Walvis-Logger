<template>
  <div>
    <v-app-bar fixed app dense>
      <v-spacer></v-spacer>
      <v-btn
        @click.prevent="toTop"
        :disabled="containerLogs.length === 0"
        class="ml-2"
        small
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn
        @click.prevent="toBottom"
        :disabled="containerLogs.length === 0"
        class="ml-2"
        small
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="text-center" v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <virtual-list
        ref="virtualList"
        style="height: 95vh; overflow-y: auto; overflow-x: hidden"
        :data-key="'id'"
        :data-sources="containerLogs"
        :data-component="itemComponent"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import socketClient from "socket.io-client";
import VirtualList from "vue-virtual-scroll-list";
import Log from "../Log.vue";
import Loader from "../Loader.vue";

export default {
  components: {
    VirtualList,
    Loader,
    Log,
  },

  data() {
    return {
      socketObject: null,
      socketId: null,
      containerLogs: [],
      itemComponent: Log,
      offset: this.$refs.virtualList,
      started: false,
      loading: false,
    };
  },

  async created() {
    this.containerLogs = [];

    await this.connectSocket();
    this.loading = true;

    this.socketObject.on("connect", () => {
      this.socketId = this.socketObject.id;
      console.log(`Socket connected with id ${this.socketId}`);
    });

    this.socketObject.on("disconnect", () => {
      console.log("socket disconnected");
      this.loading = false;
    });

    this.socketObject.on("sendLogsStatic", (data) => {
      const payload = JSON.parse(data);
      const logs = payload.log
        .map((log) => ({
          ...log,
          id: uuidv4(),
        }))
        .filter((log) => log.log);
      this.containerLogs = logs;
      this.loading = false;
    });

    this.socketObject.emit(
      "fetchLogsStatic",
      JSON.stringify({
        socketId: this.socketObject.id,
        containerId: this.$route.params.id,
      })
    );
  },

  methods: {
    toTop() {
      this.$refs.virtualList.scrollToIndex(0);
    },

    toBottom() {
      this.$refs.virtualList.scrollToBottom();
    },

    connectSocket() {
      const socketUrl = "http://localhost:8000";
      this.socketObject = socketClient.connect(socketUrl, {
        transports: ["websocket"],
      });
    },

    closeSocket() {
      console.log("closing socket before leaving route");
      this.socketObject.emit("closeLogger");
      this.loading = false;
    },
  },
};
</script>
