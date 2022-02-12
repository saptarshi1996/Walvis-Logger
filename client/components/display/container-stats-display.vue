<template>
  <div>
    <v-card class="mx-auto mt-5"> </v-card>
    <v-card class="mt-5">
      <v-card-text>
        <h3>Last read at {{ new Date(containerStreamStats.read) }}</h3>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mt-5">
      <v-card-title>Container details</v-card-title>
      <v-card-text>
        <h3>Name: {{ containerStreamStats.name }}</h3>
        <h4>PID: {{ containerStreamStats.id }}</h4>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mt-5">
      <v-card-title>CPU stats</v-card-title>
      <v-card-text v-if="containerStreamStats.cpu_stats">
        <h3 v-if="containerStreamStats.cpu_stats.cpu_usage">
          Total CPU: {{ containerStreamStats.cpu_stats.cpu_usage.total_usage }}
        </h3>
        <h3 v-if="containerStreamStats.cpu_stats.system_cpu_usage">
          System CPU stats:
          {{ containerStreamStats.cpu_stats.system_cpu_usage }}
        </h3>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mt-5">
      <v-card-title>Memory stats</v-card-title>
      <v-card-text
        v-if="containerStreamStats && containerStreamStats.memory_stats"
      >
        <h3>
          Used: {{ bytesToSize(containerStreamStats.memory_stats.usage) }}
        </h3>
        <h3>
          Limit: {{ bytesToSize(containerStreamStats.memory_stats.limit) }}
        </h3>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      containerStreamStats: "getContainerStreamStats",
    }),
  },

  methods: {
    bytesToSize(bytes) {
      const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      let l = 0,
        n = parseInt(bytes, 10) || 0;

      while (n >= 1024 && ++l) {
        n = n / 1024;
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    },
  },
};
</script>
