<script setup lang="ts">
</script>

<template>
  <div class="d-flex-column align-content-center flex-wrap pb-5 shadow-lg">
  <div class="container-fluid mt-5 p-3 text-center">
    <h1 class="display-1">Welcome to Volleyball Trainer!</h1>
  </div>
  <div class="container-fluid mt-2 pb-2">
    <h3 class="display-6 text-center">
      Click to start a
      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
         href="/quiz">Quiz</a>
      or to visit your
      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
         href="/profile" >Profile</a>.
    </h3>
  </div>
  </div>

  <div class="d-flex align-items-center justify-content-center mt-5">
    <h1 class="volleyball-icon mt-5">&#127952;</h1>
  </div>
</template>

<style scoped>

.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.volleyball-icon {
  font-size: 10rem; /* Größe nach Bedarf anpassen */
}
</style>