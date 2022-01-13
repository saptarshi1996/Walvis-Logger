<template>
  <v-btn class="ml-1" @click.prevent="checkStats">Stats</v-btn>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    checkStats() {
      console.log(this.item);
    },
  }
};
</script>
