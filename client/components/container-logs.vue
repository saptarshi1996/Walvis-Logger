<template>
  <div>
    <v-card
      id="logList"
      class="overflow-y-auto mx-auto"
      style="max-height: 95vh"
    >
      <v-card-text
        class="text-wrap"
        v-for="(log, i) in containerStreamLogs"
        :key="i"
        v-text="log.message"
      >
      </v-card-text>
    </v-card>
  </div>
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
      var container = this.$el.querySelector("#logList");
      if (container) {
        await this.$nextTick();
        container.scrollTop += container.scrollHeight;
      }
    },
  },
};
</script>
