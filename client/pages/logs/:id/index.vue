<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("getContainerList", "running");
    console.log("here");
  },
};
</script>
