<template>
  <div>
    <div v-if="$vuetify.theme.dark" class="lds-dual-ring-white"></div>
    <div v-if="!$vuetify.theme.dark" class="lds-dual-ring-black"></div>
  </div>
</template>

<style scoped>
.lds-dual-ring-white {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring-white:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring-white 1.2s linear infinite;
}
@keyframes lds-dual-ring-white {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.lds-dual-ring-black {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring-black:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring-black 1.2s linear infinite;
}
@keyframes lds-dual-ring-black {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>