<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

//datatypes
type StatId = {id: string, rating:string}
type Stat = {statId:StatId; anzahl:number}

//paths
const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

//variables
const stats: Ref<Stat[]> = ref([])

function countStatsByStatId(statId: StatId):number {
  return stats.value.filter(stat => stat.statId === statId).length
}

function countStatsByQuestionId(questionId: string):number {
  return stats.value.filter(stat => stat.statId.id === questionId).length
}

function anzahlByQuestionId(questionId: string):number {
  const stat = stats.value.find(stat => stat.statId.id === questionId);
  return stat ? stat.anzahl : 0;
}

function requestStats() {
  axios
    .get<Stat[]>(`${url}/stats`)
    .then((response) => stats.value = response.data)
    .catch((error) => console.log(error))
}

function deleteAllStats() {
  axios
    .delete<void>(`${url}/stats`)
    .then(() => stats.value = [])
    .catch((error) => console.log(error))
}

onMounted(() => requestStats())
</script>

<template>
  <div>
    <h1>{{stats}}</h1>
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" v-bind:style="{ width: countStatsByQuestionId('1') + '%' }"></div>
    </div>
    <div class="container-md mt-5">
    <button type="button" class="btn btn-primary" @click="deleteAllStats">delete all Stats</button>
  </div>
  </div>
</template>

<style scoped>

</style>