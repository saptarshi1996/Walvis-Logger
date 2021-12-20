<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list dense>
      <v-subheader
        >CONTAINERS
        <v-btn @click.prevent="clearLogs" color="error" class="ml-5" small
          >Clear</v-btn
        ></v-subheader
      >
      <v-list-item-group v-model="selectedItem" color="error">
        <v-list-item v-for="(item, i) in containerList" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <h4>{{ item.name }}</h4>
            </v-list-item-title>
            <p class="mt-2">
              <v-btn @click.prevent="getLogs(item.id)" small>Logs</v-btn>
              <v-btn @click.prevent="restartContainer(item.id)" small
                >Restart</v-btn
              >
              <v-btn
                @click.prevent="closeContainer(item.id)"
                small
                color="error"
                >Close</v-btn
              >
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedItem: null,
    };
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
      sseClient: "getSseClientObject",
    }),
  },

  props: ["containerList"],

  methods: {
    async getLogs(id) {
      await this.$store.dispatch("clearLogs");
      try {
        await this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }
      this.$store.dispatch("getContainerLogsStream", id);
    },

    async restartContainer(id) {},

    async closeContainer(id) {
      try {
        await this.sseClient.disconnect();
      } catch (ex) {}
    },

    async clearLogs() {
      try {
        await this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }
      await this.$store.dispatch("clearLogs");
    },
  },
};
</script>
