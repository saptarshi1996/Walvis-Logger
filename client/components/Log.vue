<template>
  <div>
    <v-alert dense class="mb-0 ml-1">
      <v-chip label class="mr-2">{{ source.timeStamp }}</v-chip
      >{{ source.log }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ['index', 'source']
};
</script>
