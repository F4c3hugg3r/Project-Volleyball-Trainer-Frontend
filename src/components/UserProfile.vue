<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

//datatypes
type StatId = {id: string, rating:string}
type Stat = {id:StatId; anzahl:number}
enum Position {
  none,
  Aussenangreifer,
  Mittelblocker,
  Libero,
  Zuspieler,
  Diagonalangreifer
}
enum Ablauf {
  none,
  Aufschlag,
  Annahme,
  Alles
}

//paths
const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

//variables
const stats: Ref<Stat[]> = ref([])

function getStatPercentageByGamemode(position:Position, ablauf?:Ablauf, rating?:string):number {
  /*
  1-12 Aussenangreifer, 13-24 Mittelblocker, 25-36 Zuspieler, 37-48 Diagonalangreifer, 49-60 Libero
  %2 = 1 Aufschlag, %2 = 0 Annahme
  */
  let max:number = 12
  let listFiltered: Stat[]

  switch(position) {
    case Position.Aussenangreifer:
      listFiltered = stats.value.filter(stat => Number(stat.id.id) >= 0 && Number(stat.id.id) <= 12)
      break
    case Position.Mittelblocker:
      listFiltered = stats.value.filter(stat => Number(stat.id.id) >= 13 && Number(stat.id.id) <= 24)
      break
    case Position.Zuspieler:
      listFiltered = stats.value.filter(stat => Number(stat.id.id) >= 25 && Number(stat.id.id) <= 36)
      break
    case Position.Diagonalangreifer:
      listFiltered = stats.value.filter(stat => Number(stat.id.id) >= 37 && Number(stat.id.id) <= 48)
      break
    case Position.Libero:
      listFiltered = stats.value.filter(stat => Number(stat.id.id) >= 49 && Number(stat.id.id) <= 60)
      break
    default:
      console.log("no fitting position")
      listFiltered = []
  }

  if(ablauf) {
    switch(ablauf) {
      case Ablauf.Annahme:
        listFiltered = listFiltered.filter(stat => Number(stat.id.id) %2 === 0)
        max = 6
        break
      case Ablauf.Aufschlag:
        listFiltered = listFiltered.filter(stat => Number(stat.id.id) %2 === 1)
        max = 6
        break
      case Ablauf.Alles:
        break
      default:
        console.log("no fitting Ablauf")
        break
    }
  }

  if(rating) {
    listFiltered = listFiltered.filter(stat => Number(stat.id.rating) === Number(rating))
  }

  return listFiltered.length/max*100
}

function countStatsByStatId(statId: StatId):number {
  return stats.value.filter(stat => stat.id === statId).length
}

function countStatsByQuestionId(questionId: string):number {
  return stats.value.filter(stat => stat.id.id === questionId).length
}

function anzahlByQuestionId(questionId: string):number {
  const stat = stats.value.find(stat => stat.id.id === questionId);
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
    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer)) + '%' }">{{countStatsByQuestionId('1')}}</div>
    </div>
    <div class="container-md mt-5">
    <button type="button" class="btn btn-primary" @click="deleteAllStats">delete all Stats</button>
  </div>
  </div>
</template>

<style scoped>

</style>