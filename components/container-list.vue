<template>
  <v-card class="mx-auto" tile>
    <v-list flat shaped>
      <v-subheader>
        CONTAINERS
        <Options
          v-on:selected-tail="selectedTail"
          v-on:trigger-clear-logs="clearLogs"
          :tailSwitch="tailSwitch"
        />
      </v-subheader>
      <v-list-item-group v-model="selectedItem">
        <v-list-item v-for="(item, i) in containerList" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <h4>{{ item.name }}</h4>
            </v-list-item-title>
            <p class="mt-2">
              <v-btn @click.prevent="getLogs(item.id)" small>Logs</v-btn>
              <ContainerStats :item="item" />
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="containerListLoading"
          class="mt-3 mb-3 d-flex justify-center"
        >
          <InfiniteLoader />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

import { mapGetters } from "vuex";

import ContainerStats from "./container-stats";

export default {
  data() {
    return {
      selectedItem: null,
      tailSwitch: true,
      tailLimit: "all",
    };
  },

  components: {
    ContainerStats,
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
      sseClient: "getSseClientObject",
    }),
  },

  props: ["containerList", "containerListLoading"],

  methods: {
    selectedTail(value) {
      this.tailLimit = value;
    },

    async getLogs(id) {
      await this.$store.dispatch("triggerMode", "logs");
      await this.$store.dispatch("clearLogs");

      try {
        await this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }

      this.$store.dispatch("getContainerLogsStream", {
        containerId: id,
        tail: this.tailLimit,
      });
    },

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

  watch: {},
};
</script>
