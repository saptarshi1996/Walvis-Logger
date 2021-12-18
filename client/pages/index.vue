<template>
  <v-row>
    <v-col cols="2">
      <ContainerList :containerList="containerList" />
    </v-col>
    <v-col cols="10">
      <ContainerLogs />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerList from "../components/container-list.vue";
import ContainerLogs from "../components/container-logs.vue";

export default {
  name: "IndexPage",

  components: {
    ContainerList,
    ContainerLogs,
  },

  async created() {
    await this.getContainerList();
  },

  data() {
    return {
      containerList: [],
    };
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
    }),
  },

  methods: {
    async getContainerList() {
      try {
        await this.$store.dispatch("getContainerListAction");
        this.containerList = this.containerListResponse;
        console.log(this.containerList);
      } catch (ex) {
        console.log(ex.message);
      }
    },
  },
};
</script>
