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

          <!-- <v-menu
            :disabled="
              !exportAsCsvForm.selectedContainer && !exportAsCsvForm.fileName
            "
            ref="sinceMenu"
            v-model="sinceMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="exportAsCsvForm.since"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exportAsCsvForm.since"
                label="From time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="sinceMenu"
              v-model="exportAsCsvForm.since"
              full-width
              format="24hr"
              @click:minute="$refs.sinceMenu.save(exportAsCsvForm.since)"
            ></v-time-picker>
          </v-menu>

          <v-menu
            :disabled="
              !exportAsCsvForm.selectedContainer && !exportAsCsvForm.fileName
            "
            ref="untilMenu"
            v-model="untilMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="exportAsCsvForm.until"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exportAsCsvForm.until"
                label="Until time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="untilMenu"
              v-model="exportAsCsvForm.until"
              full-width
              format="24hr"
              @click:minute="$refs.untilMenu.save(exportAsCsvForm.until)"
            ></v-time-picker>
          </v-menu> -->
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
import dateHelper from "../../helpers/date-helper";

export default {
  data() {
    return {
      exportAsCsvForm: {
        selectedContainer: null,
        // since: null,
        // until: null,
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
        // since: null,
        // until: null,
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
