<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: ['snackbar', 'timeout', 'text'],
};
</script>
