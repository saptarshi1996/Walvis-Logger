<template>
  <v-row> 
    <v-col cols="12">
      <div class="d-flex justify-center mt-6" v-if="!loadingLogs && logs && logs.length === 0">
        <h2>Select a container to view logs</h2>
      </div>
      <v-alert dense class="mb-0 ml-1" v-for="(log, i) in logs" :key="i">
        <v-chip label class="mr-2">{{ log.timeStamp }}</v-chip>{{ log.log }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  props: ["socketObject"],

  data() {
    return {
      socket: null,
    };
  },

  computed: {
    ...mapGetters({
      logs: "getAddLogs",
      loadingLogs: 'getLoadingLogs',
    }),
  },
};
</script>
