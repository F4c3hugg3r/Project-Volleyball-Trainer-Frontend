<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="d-flex justify-content-evenly navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item m-auto">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/quiz">Quiz</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/profile">Profile</RouterLink>
          </li>
        </ul>
    </nav>

  </header>
  <RouterView></RouterView>
</template>

<style scoped>

</style>