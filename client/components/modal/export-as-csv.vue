<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Export as CSV </v-card-title>
        <v-card-text>
          <v-select
            :disabled="loadingCsvModal"
            v-model="exportAsCsvForm.selectedContainer"
            item-text="name"
            item-value="id"
            :items="containerSelectList"
            label="Select Container"
          ></v-select>
          <v-text-field
            name="fileName"
            label="File Name"
            v-model="exportAsCsvForm.fileName"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.prevent="downloadLogsAsCSV"
            :disabled="loadingCsvModal"
            >Download</v-btn
          >
          <v-btn
            color="primary"
            text
            @click.prevent="dialog = false"
            :disabled="loadingCsvModal"
            >Close</v-btn
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
      exportAsCsvForm: {
        selectedContainer: null,
        fileName: "",
      },
      dialog: false,
      sinceMenu: false,
      untilMenu: false,
      loadingCsvModal: false,
    };
  },

  props: ["containerSelectList"],

  methods: {
    async downloadLogsAsCSV() {
      try {
        this.loadingCsvModal = true;

        if (
          this.exportAsCsvForm &&
          this.exportAsCsvForm.selectedContainer &&
          this.exportAsCsvForm.fileName
        ) {

            const id = this.exportAsCsvForm.selectedContainer;
            const fileName = this.exportAsCsvForm.fileName;
            const dataType = "csv";

            // open this tag in a new window to download the file
            const baseUrl = process.env.SERVER_BASE_URL;
            window.open(`${baseUrl}/logger-server/download-logs/${id}?log_format=${dataType}&file_name=${fileName}`);
        }

        this.loadingCsvModal = false;
      } catch (ex) {
        console.log(ex.message);
        this.loadingCsvModal = false;
      }
    },

    clearForm() {
      this.exportAsCsvForm = {
        selectedContainer: null,
        fileName: "",
      };
    },
  },

  watch: {
    dialog(value) {
      if (!value) {
        this.clearForm();
      }
    },
  },
};
</script>
