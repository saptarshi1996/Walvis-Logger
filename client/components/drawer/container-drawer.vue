<template>
  <v-navigation-drawer app v-model="drawer">
    <v-list flat shaped>
      <v-subheader>
        CONTAINERS
        <ContainerOptions
          v-on:selected-tail="selectedTail"
          v-on:trigger-clear-logs="clearLogs"
          :tailSwitch="tailSwitch"
        />
      </v-subheader>
      <v-list-item-group v-model="selectedItem">
        <v-text-field
          hide-details
          class="m-2 pl-3 pb-1"
          v-model="containerName"
          placeholder="Container Name"
        ></v-text-field>

        <v-list-item v-for="(item, i) in containerList" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <h4>{{ item.name }}</h4>
            </v-list-item-title>
            <p class="mt-2">
              <v-btn :disabled="loading" @click.prevent="getLogs(item.id)" small
                >Logs</v-btn
              >
              <ContainerStats :loading="loading" :item="item" />
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
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerOptions from "./container-options";
import ContainerStats from "./container-stats";

export default {
  data() {
    return {
      selectedItem: null,
      tailSwitch: true,
      tailLimit: "10",
      drawer: true,
      containerName: "",
    };
  },

  components: {
    ContainerStats,
    ContainerOptions,
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
      sseClient: "getSseClientObject",
      loading: "getStreamLoading",
      statsSseClient: "getSseStatsClientObject",
    }),
  },

  props: ["containerList", "containerListLoading", "getContainerList"],

  methods: {
    selectedTail(value) {
      this.tailLimit = value;
    },

    async getLogs(id) {
      await this.$store.dispatch("triggerFirstLoaded", true);

      await this.$store.dispatch("triggerStreamLoader", true);
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

    async clearLogs() {
      // Close both the clients and clear list. but not call container list.
      try {
        await this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }

      try {
        await this.statsSseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }

      // clear all logs and set first load
      await this.$store.dispatch("clearLogs");
      await this.$store.dispatch("triggerFirstLoaded", false);
    },
  },

  watch: {
    async containerName(value) {
      value
        ? await this.getContainerList(value)
        : await this.getContainerList();
    },
  },
};
</script>
