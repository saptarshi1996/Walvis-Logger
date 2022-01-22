<template>
  <v-card class="overflow-y-auto mx-auto" style="max-height: 93vh; width: 100%">
    <div v-if="containerStreamLogs && containerStreamLogs.length > 0">
      <div
        class="text-wrap ma-2"
        v-for="(log, i) in containerStreamLogs"
        :key="i"
      >
        <template v-if="log && log.message">
          <small class="primary--text">
            <b>{{ log.created_at }}</b>
          </small>
          <small class="ml-1">{{ log.message }}</small>
        </template>
      </div>
    </div>
    <div v-else class="text-center">
      <h2>Select a container to view logs</h2>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      containerStreamLogs: "getContainerStreamLogs",
    }),
  },

  watch: {
    async containerStreamLogs() {
      const container = this.$el.querySelector("#logList");
      if (container) {
        await this.$nextTick();
        container.scrollTop += container.scrollHeight;
      }
    },
  },
};
</script>
