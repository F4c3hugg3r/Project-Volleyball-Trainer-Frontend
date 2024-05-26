<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

//datatypes
type Stat = {id: number, rating:number; anzahl:number}

//paths
const url = "http://localhost:8080"

//variables
const stats: Ref<Stat[]> = ref([])

function requestStats() {
  axios
    .get<Stat[]>(`http://localhost:8080/stats`)
    .then((response) => stats.value = response.data)
    .catch((error) => console.log(error))
}

onMounted(() => requestStats())
</script>

<template>
  <div>
    <h1>{{stats}}</h1>
  </div>
</template>

<style scoped>

</style>