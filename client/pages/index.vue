<template>
  <v-row>
    <v-col cols="3">
      <ContainerList :containerList="containerList" :containerListLoading="containerListLoading" />
    </v-col>
    <v-col cols="9">
      <template v-if="mode === 'logs'">
        <ContainerLogs />
      </template>
      <template v-if="mode === 'stats'">
        <ContainerStatsDisplay />
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerList from "../components/container-list.vue";
import ContainerLogs from "../components/container-logs.vue";
import InfiniteLoader from "../components/infinite-loader.vue";
import ContainerStatsDisplay from "../components/container-stats-display.vue";
import Options from "../components/options.vue";

export default {

  name: "IndexPage",

  components: {
    ContainerList,
    ContainerLogs,
    InfiniteLoader,
    ContainerStatsDisplay,
    Options,
  },

  async created() {
    await this.getContainerList();
  },

  data() {
    return {
      containerList: [],
      loading: false,
      containerListLoading: false,
    };
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
      mode: "getMode",
    }),
  },

  methods: {
    async getContainerList() {
      try {
        this.containerListLoading = true;
        await this.$store.dispatch("getContainerListAction");
        this.containerList = this.containerListResponse;
        console.log(this.containerList);
        this.containerListLoading = false;
      } catch (ex) {
        this.containerListLoading = false;
        console.log(ex.message);
      }
    },
  },

};
</script>