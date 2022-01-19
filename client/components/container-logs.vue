<template>
  <v-card class="overflow-y-auto mx-auto" style="max-height: 93vh">
    <div
      class="text-wrap ma-2"
      v-for="(log, i) in containerStreamLogs"
      :key="i"
    >
      <v-chip color="primary" text-color="white">
        {{ log.created_at }}
      </v-chip>
      {{ log.message }}
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
