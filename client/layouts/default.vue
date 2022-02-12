<template>
  <Nuxt />
</template>

<script>
export default {
  name: "DefaultLayout",
  middleware: "auth",
};
</script>
