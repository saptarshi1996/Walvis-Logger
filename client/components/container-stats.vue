<template>
  <v-btn class="ml-1" @click.prevent="checkStats">Stats</v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {

  computed: {
    ...mapGetters({
      sseClient: "getSseStatsClientObject",
    }),
  },

  props: ["item"],

  methods: {

    async checkStats() {

      await this.$store.dispatch("triggerMode", "stats");

      try {
        console.log("disconnected previous");
        await this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }

      await this.$store.dispatch("getContainerStatsStream", {
        containerId: this.item.id,
      });

    },
  },
};
</script>
