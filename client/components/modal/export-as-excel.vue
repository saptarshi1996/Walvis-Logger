<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Export as excel </v-card-title>
        <v-card-text>
          <v-select
            :disabled="loadingExcelModal"
            v-model="exportAsExcelForm.selectedContainer"
            item-text="name"
            item-value="id"
            :items="containerSelectList"
            label="Select Container"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.prevent="dialog = false"
            :disabled="loadingExcelModal"
            >Close</v-btn
          >
          <v-btn
            color="primary"
            text
            @click.prevent="downloadLogsAsExcel"
            :disabled="loadingExcelModal"
            >Download</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exportAsExcelForm: {
        selectedContainer: null,
      },
      dialog: false,
      loadingExcelModal: false,
    };
  },

  props: ["containerSelectList"],

  methods: {
    async downloadLogsAsExcel() {
      try {
        if (
          this.exportAsExcelForm &&
          this.exportAsExcelForm.selectedContainer
        ) {
          this.loadingExcelModal = true;
          this.loadingExcelModal = false;
        }
      } catch (ex) {
        this.loadingExcelModal = false;
      }
    },
  },
};
</script>
