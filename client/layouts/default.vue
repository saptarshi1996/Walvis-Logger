<template>
  <v-app>
    <Sidebar :socketObject="socketObject" />
    <v-main>
      <NuxtChild :socketObject="socketObject" />
    </v-main>
  </v-app>
</template>

<script>
import socketClient from "socket.io-client";

import Sidebar from "../components/Sidebar.vue";
import Snackbar from "~/components/Snackbar.vue";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
    Snackbar,
  },

  data() {
    return {
      items: [],
      right: true,
      rightDrawer: true,
      title: "Walvis",
      socketObject: null,
      logsList: [],
    };
  },

  async mounted() {

    if (!('showTimeStamp' in localStorage)) {
      localStorage.setItem('showTimeStamp', false)
    }

    if (!('showDisabledContainer' in localStorage)) {
      localStorage.setItem('showDisabledContainer', false)
    }

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
      this.$store.dispatch("addLogs", payload);
    });
  },

  methods: {
    connectSocket() {
      const socketUrl = process.env.BASE_URL;
      this.socketObject = socketClient.connect(socketUrl, {
        transports: ["websocket"],
      });
    },
  },
};
</script>
