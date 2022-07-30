<template>
  <div>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("getContainerList", "running");
  },

  watch: {
    $route(to, from) {
      console.log(to);
    },
  },
};
</script>
