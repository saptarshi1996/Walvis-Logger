<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-5" small color="primary" dark v-bind="attrs" v-on="on">
          Options
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-select
                color="primary"
                @input="emitTailOptions"
                v-model="selectedTailOption"
                :items="tailItems"
                label="Tail Options"
              ></v-select>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-btn
                @click.prevent="$emit('trigger-clear-logs')"
                color="primary"
                >Clear Logs</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    tailItems: ["all", "10", "50", "100", "200", "500"],
    selectedTailOption: "all",
  }),

  methods: {
    emitTailOptions() {
      this.$emit("selected-tail", this.selectedTailOption);
    },
  },
};
</script>
