<template>
  <v-row> 
    <v-col cols="12">
      <v-alert dense class="mb-1 ml-1" v-for="(log, i) in logs" :key="i">
        <v-chip class="mr-2">{{ log.timeStamp }}</v-chip>{{ log.log }}
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
    }),
  },
};
</script>
