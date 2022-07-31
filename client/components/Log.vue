<template>
  <div>
    <v-alert dense class="mb-0 ml-1">
      <v-chip v-if="showTimeStamp" label class="mr-2">{{ source.timeStamp }}</v-chip
      >{{ source.log }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ['index', 'source'],

  data() {
    return {
      showTimeStamp: localStorage.getItem("TIME_STAMP") === "SHOW",
    }
  }

};
</script>
