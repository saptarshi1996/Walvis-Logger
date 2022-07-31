<template>
  <div>
    <div v-if="logMode === 'STREAM'"><Stream ref="stream" /></div>
    <div v-else><Static ref="static" /></div>
  </div>
</template>

<script>

import Stream from "../../../components/logs/Stream.vue";
import Static from "../../../components/logs/Static.vue";

export default {
  data() {
    return {
      logMode: localStorage.getItem('LOG_MODE'),
    };
  },

  async created() {
    const status = localStorage.getItem("SHOW_DISABLED_CONTAINER") === "NO" ? "running" : "all";
    await this.$store.dispatch("getContainerSideBar", status);
  },

  components: {
    Stream,
    Static,
  },

   beforeRouteLeave(to, from, next) {
    if (this.logMode === 'STREAM')
      this.$refs.stream.closeSocket();
    else
      this.$refs.static.closeSocket();
    next();
  },
};
</script>
