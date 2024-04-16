<script setup>
import Response from "../components/Generator.vue";
</script>

<template class="background">
  <img src="../assets/depot.jpg" alt="innovation depot">

    <Response/>


</template>

<style scoped>
img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

h1 {
  color: white;
  text-decoration-color: black;
 }
</style>