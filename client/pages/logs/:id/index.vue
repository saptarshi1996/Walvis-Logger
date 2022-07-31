<template>
  <div>
    <v-app-bar fixed app dense>
      <v-btn
        @click.prevent="startStream"
        :disabled="started"
        class="ml-2"
        small
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        @click.prevent="stopStream"
        :disabled="!started"
        class="ml-2"
        small
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn
        @click.prevent="clearLogs"
        :disabled="containerLogs.length === 0"
        class="ml-2"
        small
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="toTop" :disabled="!started" class="ml-2" small>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn @click.prevent="toBottom" :disabled="!started" class="ml-2" small>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-app-bar>
    <virtual-list
      ref="virtualList"
      style="height: 95vh; overflow-y: auto; overflow-x: hidden"
      :data-key="'id'"
      :data-sources="containerLogs"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import socketClient from "socket.io-client";
import VirtualList from "vue-virtual-scroll-list";

import Log from "../../../components/Log.vue";
import Loader from "../../../components/Loader.vue";

export default {
  data() {
    return {
      socketObject: null,
      socketId: null,
      containerLogs: [],
      itemComponent: Log,
      fab: false,
      offset: this.$refs.virtualList,
      started: false,
    };
  },

  components: {
    VirtualList,
    Loader,
    Log,
  },

  async created() {
    this.containerLogs = [];

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
      this.containerLogs.push({
        id: uuidv4(),
        ...payload,
      });
    });
  },

  methods: {
    startStream() {
      this.started = true;
      this.loading = true;
      setTimeout(() => {
        this.socketObject.emit(
          "fetchLogs",
          JSON.stringify({
            socketId: this.socketObject.id,
            containerId: this.$route.params.id,
          })
        );
        this.loading = false;
      }, 200);
    },

    stopStream() {
      this.started = false;
      this.loading = true;
      setTimeout(() => {
        this.socketObject.emit("closeLogger");
        this.loading = false;
      }, 200);
    },

    clearLogs() {
      this.containerLogs = [];
    },

    toTop() {
      this.$refs.virtualList.scrollToIndex(0);
    },

    toBottom() {
      console.log(this.$refs.virtualList.getOffset());
      this.$refs.virtualList.scrollToBottom();
    },

    connectSocket() {
      const socketUrl = "http://localhost:8000";
      this.socketObject = socketClient.connect(socketUrl, {
        transports: ["websocket"],
      });
    },
  },

  beforeRouteLeave(fo, from, next) {
    console.log('closing socket before leaving route');
    this.socketObject.emit('closeLogger');
    next();
  },
};
</script>
