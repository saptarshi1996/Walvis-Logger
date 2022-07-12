<template>
  <v-row>
    <v-col cols="12">
      <div
        id="scrollView"
        class="d-flex justify-center mt-6"
        v-if="!loadingLogs && logs && logs.length === 0"
      >
        <h2>Select a container to view logs</h2>
      </div>
      <v-alert dense class="mb-0 ml-1" v-for="(log, i) in logs" :key="i">
        <v-chip v-if="logsTimeStampVisible" label class="mr-2">{{
          log.timeStamp
        }}</v-chip
        >{{ log.log }}
      </v-alert>
    </v-col>
    <v-btn @click="scrollToBottom" fab dark fixed right bottom>
      <v-icon dark>mdi-chevron-down</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContainerPage",
  props: ["socketObject"],

  data() {
    return {
      logsTimeStampVisible: false,
      socket: null,
    };
  },

  async created() {
    this.socketObject.emit("closeLogger");
    await this.$store.dispatch("clearAllLogs");
    await this.$store.dispatch("startLoadingLogs");
    this.socketObject.emit(
      "fetchLogs",
      JSON.stringify({
        socketId: this.socketObject.id,
        containerId: this.$route.params.id,
      })
    );
  },

  computed: {
    ...mapGetters({
      logs: "getAddLogs",
      loadingLogs: "getLoadingLogs",
    }),
  },

  methods: {
    scrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
  },

  watch: {
    async $route(to, from) {
      this.socketObject.emit("closeLogger");
      await this.$store.dispatch("clearAllLogs");
      await this.$store.dispatch("startLoadingLogs");
      this.socketObject.emit(
        "fetchLogs",
        JSON.stringify({
          socketId: this.socketObject.id,
          containerId: this.$route.params.id,
        })
      );
    },
  },
};
</script>
