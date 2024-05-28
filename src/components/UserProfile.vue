<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

//datatypes
type Stat = {id: number, rating:number; anzahl:number}

//paths
const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

//variables
const stats: Ref<Stat[]> = ref([])

function requestStats() {
  console.log(url)
  axios
    .get<Stat[]>(`${url}/stats`)
    .then((response) => stats.value = response.data)
    .catch((error) => console.log(error))
}

onMounted(() => requestStats())
</script>

<template>
  <div>
    <h1>{{stats}}</h1>
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: 35%"></div>
    </div>
  </div>
</template>

<style scoped>

</style>