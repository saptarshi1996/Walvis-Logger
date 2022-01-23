<template>
  <v-card class="overflow-y-auto mx-auto" style="width: 100%">
    <div v-if="containerStreamLogs && containerStreamLogs.length > 0">
      <div
        class="text-wrap ma-2"
        v-for="(log, i) in containerStreamLogs"
        :key="i"
      >
        <small class="primary--text">
          <b>{{ log.created_at }}</b>
        </small>
        <small class="ml-1">{{ log.message }}</small>
      </div>
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
