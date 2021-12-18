<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list dense>
      <v-subheader>CONTAINERS</v-subheader>
      <v-list-item-group v-model="selectedItem" color="error">
        <v-list-item
          v-for="(item, i) in containerList"
          :key="i"
          @click.prevent="getLogs(item.id)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
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
    getLogs(id) {
      this.$store.dispatch("getContainerLogsStream", id);
    },
  },

  watch: {
    selectedItem() {
      try {
        this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }
    },
  },
};
</script>
