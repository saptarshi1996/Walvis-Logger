<template>
  <v-app dark>
    <!-- <Snackbar :snackbar="true" :timeout="2000" :text="'Container was closed'" /> -->
    <Sidebar :socketObject="socketObject" />
    <v-main>
      <NuxtChild :socketObject="socketObject" />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    Snackbar
},

  data() {
    return {
      items: [],
      right: true,
      rightDrawer: false,
      title: "Walvis",
      socketObject: null,
      logsList: [],
    };
  },

  async mounted() {
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
