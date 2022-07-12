<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Walvis </v-list-item-title>
        <v-list-item-subtitle class="mt-2">
          CONTAINERS
          <v-btn class="ml-2" small @click.prevent="stopLoggingContainer"
            >Stop</v-btn
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item
          v-for="(container, i) of containerList"
          :key="i"
          @click="getContainerLogs(container)"
        >
          <v-list-item-title>
            {{ container.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  props: ["socketObject"],

  async created() {
    await this.$store.dispatch("listContainerAction");
  },

  data() {
    return {
      drawer: true,
    };
  },

  computed: {
    ...mapGetters({
      loadingLogs: "getLoadingLogs",
      containerList: "getContainerList",
    }),
  },

  methods: {
    async getContainerLogs(container) {
      await this.$store.dispatch("clearAllLogs");
      await this.$store.dispatch("startLoadingLogs");
      this.socketObject.emit(
        "fetchLogs",
        JSON.stringify({
          socketId: this.socketObject.id,
          containerId: container.id,
        })
      );
    },

    async stopLoggingContainer() {
      this.socketObject.emit('closeLogger');
      await this.$store.dispatch("clearAllLogs");
    },
  },

};
</script>
