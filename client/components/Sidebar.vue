<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Walvis </v-list-item-title>
        <v-list-item-subtitle class="mt-2"> CONTAINERS </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item v-for="(container, i) of containerList" :key="i">
          <v-list-item-title @click.prevent="getContainerLogs(container)">
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
  props: ["drawer", "socketObject"],

  async created() {
    await this.$store.dispatch("listContainerAction");
    console.log(this.containerList);
  },

  computed: {
    ...mapGetters({
      containerList: "getContainerList",
    }),
  },

  methods: {
    async getContainerLogs(container) {
      await this.$store.dispatch('clearAllLogs');
      this.socketObject.emit(
        "fetchLogs",
        JSON.stringify({
          socketId: this.socketObject.id,
          containerId: container.id,
        })
      );
    },
  },
};
</script>
