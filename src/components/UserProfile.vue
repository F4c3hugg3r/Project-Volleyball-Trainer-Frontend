<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

//datatypes
type StatId = {id: number, rating:number}
type Stat = {id:StatId; anzahl:number}
type Badge = {anzahl:number; rating:number}
enum Position {
  none,
  Aussenangreifer1,
  Mittelblocker,
  Zuspieler,
  Diagonalangreifer,
  Libero,
  Aussenangreifer2
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
let stats: Ref<Stat[]> = ref([])
let currentPos = ref(Position.none)

function filterStatsByPosition(position:Position): Stat[] {
  let listFiltered: Stat[]

  switch(position) {
    case Position.Aussenangreifer1:
      listFiltered = stats.value.filter(stat => stat.id.id >= 0 && stat.id.id <= 12)
      break
    case Position.Mittelblocker:
      listFiltered = stats.value.filter(stat => stat.id.id >= 13 && stat.id.id <= 24)
      break
    case Position.Zuspieler:
      listFiltered = stats.value.filter(stat => stat.id.id >= 25 && stat.id.id <= 36)
      break
    case Position.Diagonalangreifer:
      listFiltered = stats.value.filter(stat => stat.id.id >= 37 && stat.id.id <= 48)
      break
    case Position.Libero:
      listFiltered = stats.value.filter(stat => stat.id.id >= 49 && stat.id.id <= 60)
      break
    case Position.Aussenangreifer2:
      listFiltered = stats.value.filter(stat => stat.id.id >= 61 && stat.id.id <= 72)
      break
    default:
      console.log("no fitting position")
      listFiltered = []
  }

  return listFiltered
}

function getColorFromBadge(badge:Badge) {
  let color
  switch (badge.rating) {
    case 1:
      color = "info"
      break
    case 2:
      color = "success"
      break
    case 3:
      color = "primary"
      break
    case 4:
      color = "dark"
      break
  }
  return color
}

function getAnzahlFromBadge(badge:Badge) {
  return badge.anzahl
}

function getStatPercentageByGamemode(position:Position, ablauf?:Ablauf, rating?:number):number {
  /* 1-12 AA1, 13-24 Mittelblocker, 25-36 Zuspieler, 37-48 Diagonalangreifer, 49-60 Libero, 61-72 AA2
  %2 = 1 Aufschlag, %2 = 0 Annahme */
  if(!stats.value) return 0
  let max:number = 48
  let listFiltered = filterStatsByPosition(position)

  if(ablauf) {
    switch(ablauf) {
      case Ablauf.Annahme:
        listFiltered = listFiltered.filter(stat => stat.id.id %2 == 0)
        max = 24
        break
      case Ablauf.Aufschlag:
        listFiltered = listFiltered.filter(stat => stat.id.id %2 == 1)
        max = 24
        break
      case Ablauf.Alles:
        break
      default:
        console.log("no fitting Ablauf")
        break
    }
  }

  if(rating) {
    listFiltered = listFiltered.filter(stat => stat.id.rating === rating)
    if(ablauf === Ablauf.Aufschlag || ablauf === Ablauf.Annahme) max = 6
    else max = 12
  }

  return Math.round(listFiltered.length/max*100)
}

function checkAnzahlByPosition(position:Position):Badge {
  let rating = null
  let anzahl = 0

  for(let i = 4; i>0; i--) {
    if(getStatPercentageByGamemode(position, Ablauf.Alles, i) === 100) {
      rating = i
      anzahl = 1
      break
    }
  }
  if(!rating) return {anzahl: 0, rating:0}

  let listFiltered = filterStatsByPosition(position)
  listFiltered = listFiltered.filter(stat => stat.id.rating === rating)
  const highestAnzahl = stats.value.reduce((maxStat, currentStat) => currentStat.anzahl > maxStat.anzahl ? currentStat : maxStat, stats.value[0]).anzahl;
  let bool:boolean = false

  for(let i = 1; i<=highestAnzahl; i++) {
    for(stat in listFiltered) {
      if(stat.anzahl<i) {
        bool = true
        break
      }
    }
    if(bool) {
      anzahl = i-1
      break
    }
    else anzahl = i
  }
  return {anzahl: anzahl, rating: rating}
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

function deleteStatsByPosition(positionEnum: Position) {
  const position = positionEnum.valueOf()
  axios
    .delete<void>(`${url}/stats/${position}`)
    .catch((error) => console.log(error))

  switch(position) {
    case Position.Aussenangreifer1:
      stats.value = stats.value.filter(stat => stat.id.id > 12)
      break
    case Position.Mittelblocker:
      stats.value = stats.value.filter(stat => stat.id.id < 13 || stat.id.id > 24)
      break
    case Position.Zuspieler:
      stats.value = stats.value.filter(stat => stat.id.id < 25 || stat.id.id > 36)
      break
    case Position.Diagonalangreifer:
      stats.value = stats.value.filter(stat => stat.id.id < 37 || stat.id.id > 48)
      break
    case Position.Libero:
      stats.value = stats.value.filter(stat => stat.id.id < 49 || stat.id.id > 60)
      break
    case Position.Aussenangreifer2:
      stats.value = stats.value.filter(stat => stat.id.id < 61 || stat.id.id > 73)
      break
  }
}

onMounted(() => {
  requestStats()
})
</script>

<template>
    <div class="container-fluid p-5">
      <div class="alert alert-warning mb-5 text-center" role="alert" v-if="stats.length<1">
        Es sind noch keine Stats vorhanden!
      </div>
    <div class="accordion shadow" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>Außenangreifer 1</strong>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row mb-2">
              <div class="col">
                <span class="badge text-bg-{{getColorFromBadge(checkAnzahlByPosition(Position.Aussenangreifer1))}}" v-if="getStatPercentageByGamemode(Position.Aussenangreifer1)===100">{{getAnzahlFromBadge}}</span>
              </div>
              <div class="col">
                <h5>Kompletter Fortschritt</h5>
              </div>
              <div class="col text-end">
                <button type="button" class="btn btn-sm btn-outline-dark" @click="currentPos=Position.Aussenangreifer1"
                        data-bs-toggle="modal" data-bs-target="#deleteStatsByPosition">delete stats</button>
              </div>
              </div>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" id="pbAA" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer1)) + '%' }">{{ getStatPercentageByGamemode(Position.Aussenangreifer1) + "%" }}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Aufschlag))
              + '%' }">{{ getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Aufschlag) + "%" }}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Annahme))
              + '%' }">{{ getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Annahme) + "%" }}</div>
            </div>
            <h6 class="mt-4 text-center">Ratings</h6>
            <div class="row text-center">
              <div class="col">Beginner</div>
              <div class="col">Amateur</div>
              <div class="col">Pro</div>
              <div class="col">Perfect</div>
            </div>
            <div class="progress-stacked d-flex justify-content-evenly">
              <div class="progress" role="progressbar" aria-label="Segment one" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{ getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 1) }}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{ getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 2) }}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{ getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 3) }}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{ getStatPercentageByGamemode(Position.Aussenangreifer1, Ablauf.Alles, 4) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
            <strong>Außenangreifer 2</strong>
          </button>
        </h2>
        <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row mb-2">
              <div class="col">
                <span class="badge text-bg-{{getColorFromBadge(checkAnzahlByPosition(Position.Aussenangreifer2))}}" v-if="getStatPercentageByGamemode(Position.Aussenangreifer2)===100">{{getAnzahlFromBadge}}</span>
              </div>
              <div class="col">
                <h5>Kompletter Fortschritt</h5>
              </div>
              <div class="col text-end">
                <button type="button" class="btn btn-sm btn-outline-dark" @click="currentPos=Position.Aussenangreifer2"
                        data-bs-toggle="modal" data-bs-target="#deleteStatsByPosition">delete stats</button>
              </div>
            </div>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" id="pbAA" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer2)) + '%' }">{{ getStatPercentageByGamemode(Position.Aussenangreifer2) + "%" }}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Aufschlag))
              + '%' }">{{ getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Aufschlag) + "%" }}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Annahme))
              + '%' }">{{ getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Annahme) + "%" }}</div>
            </div>
            <h6 class="mt-4 text-center">Ratings</h6>
            <div class="row text-center">
              <div class="col">Beginner</div>
              <div class="col">Amateur</div>
              <div class="col">Pro</div>
              <div class="col">Perfect</div>
            </div>
            <div class="progress-stacked d-flex justify-content-evenly">
              <div class="progress" role="progressbar" aria-label="Segment one" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{ getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 1) }}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{ getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 2) }}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{ getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 3) }}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{ getStatPercentageByGamemode(Position.Aussenangreifer2, Ablauf.Alles, 4) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <strong>Mittelblocker</strong>
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row mb-2">
              <div class="col">
                <span class="badge text-bg-{{getColorFromBadge(checkAnzahlByPosition(Position.Mittelblocker))}}" v-if="getStatPercentageByGamemode(Position.Mittelblocker)===100">{{getAnzahlFromBadge}}</span>
              </div>
              <div class="col">
                <h5>Kompletter Fortschritt</h5>
              </div>
              <div class="col text-end">
                <button type="button" class="btn btn-sm btn-outline-dark" @click="currentPos=Position.Mittelblocker"
                        data-bs-toggle="modal" data-bs-target="#deleteStatsByPosition">delete stats</button>
              </div>
            </div>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Mittelblocker)) + '%' }">{{getStatPercentageByGamemode(Position.Mittelblocker)+"%"}}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Aufschlag))
              + '%' }">{{getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Aufschlag)+"%"}}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Annahme))
              + '%' }">{{getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Annahme)+"%"}}</div>
            </div>
            <h6 class="mt-4 text-center">Ratings</h6>
            <div class="row text-center">
              <div class="col">Beginner</div>
              <div class="col">Amateur</div>
              <div class="col">Pro</div>
              <div class="col">Perfect</div>
            </div>
            <div class="progress-stacked d-flex justify-content-evenly">
              <div class="progress" role="progressbar" aria-label="Segment one" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 1)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 2)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 3)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{getStatPercentageByGamemode(Position.Mittelblocker, Ablauf.Alles, 4)}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <strong>Zuspieler</strong>
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row mb-2">
              <div class="col">
                <span class="badge text-bg-{{getColorFromBadge(checkAnzahlByPosition(Position.Zuspieler))}}" v-if="getStatPercentageByGamemode(Position.Zuspieler)===100">{{getAnzahlFromBadge}}</span>
              </div>
              <div class="col">
                <h5>Kompletter Fortschritt</h5>
              </div>
              <div class="col text-end">
                <button type="button" class="btn btn-sm btn-outline-dark" @click="currentPos=Position.Zuspieler"
                        data-bs-toggle="modal" data-bs-target="#deleteStatsByPosition">delete stats</button>
              </div>
            </div>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Zuspieler)) + '%' }">{{getStatPercentageByGamemode(Position.Zuspieler)+"%"}}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Aufschlag))
              + '%' }">{{getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Aufschlag)+"%"}}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Annahme))
              + '%' }">{{getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Annahme)+"%"}}</div>
            </div>
            <h6 class="mt-4 text-center">Ratings</h6>
            <div class="row text-center">
              <div class="col">Beginner</div>
              <div class="col">Amateur</div>
              <div class="col">Pro</div>
              <div class="col">Perfect</div>
            </div>
            <div class="progress-stacked d-flex justify-content-evenly">
              <div class="progress" role="progressbar" aria-label="Segment one" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 1)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 2)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 3)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{getStatPercentageByGamemode(Position.Zuspieler, Ablauf.Alles, 4)}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <strong>Diagonal-Angreifer</strong>
          </button>
        </h2>
        <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row mb-2">
              <div class="col">
                <span class="badge text-bg-{{getColorFromBadge(checkAnzahlByPosition(Position.Diagonalangreifer))}}" v-if="getStatPercentageByGamemode(Position.Diagonalangreifer)===100">{{getAnzahlFromBadge}}</span>
              </div>
              <div class="col">
                <h5>Kompletter Fortschritt</h5>
              </div>
              <div class="col text-end">
                <button type="button" class="btn btn-sm btn-outline-dark" @click="currentPos=Position.Diagonalangreifer"
                        data-bs-toggle="modal" data-bs-target="#deleteStatsByPosition">delete stats</button>
              </div>
            </div>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Diagonalangreifer)) + '%' }">{{getStatPercentageByGamemode(Position.Diagonalangreifer)+"%"}}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Aufschlag))
              + '%' }">{{getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Aufschlag)+"%"}}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Annahme))
              + '%' }">{{getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Annahme)+"%"}}</div>
            </div>
            <h6 class="mt-4 text-center">Ratings</h6>
            <div class="row text-center">
              <div class="col">Beginner</div>
              <div class="col">Amateur</div>
              <div class="col">Pro</div>
              <div class="col">Perfect</div>
            </div>
            <div class="progress-stacked d-flex justify-content-evenly">
              <div class="progress" role="progressbar" aria-label="Segment one" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 1)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 2)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 3)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{getStatPercentageByGamemode(Position.Diagonalangreifer, Ablauf.Alles, 4)}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            <strong>Libero</strong>
          </button>
        </h2>
        <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row mb-2">
              <div class="col">
                <span class="badge text-bg-{{getColorFromBadge(checkAnzahlByPosition(Position.Libero))}}" v-if="getStatPercentageByGamemode(Position.Libero)===100">{{getAnzahlFromBadge}}</span>
              </div>
              <div class="col">
                <h5>Kompletter Fortschritt</h5>
              </div>
              <div class="col text-end">
                <button type="button" class="btn btn-sm btn-outline-dark" @click="currentPos=Position.Libero"
                        data-bs-toggle="modal" data-bs-target="#deleteStatsByPosition">delete stats</button>
              </div>
            </div>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Libero)) + '%' }">{{getStatPercentageByGamemode(Position.Libero)+"%"}}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Libero, Ablauf.Aufschlag))
              + '%' }">{{getStatPercentageByGamemode(Position.Libero, Ablauf.Aufschlag)+"%"}}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Libero, Ablauf.Annahme))
              + '%' }">{{getStatPercentageByGamemode(Position.Libero, Ablauf.Annahme)+"%"}}</div>
            </div>
            <h6 class="mt-4 text-center">Ratings</h6>
            <div class="row text-center">
              <div class="col">Beginner</div>
              <div class="col">Amateur</div>
              <div class="col">Pro</div>
              <div class="col">Perfect</div>
            </div>
            <div class="progress-stacked d-flex justify-content-evenly">
              <div class="progress" role="progressbar" aria-label="Segment one" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 1)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 2)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 3)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{getStatPercentageByGamemode(Position.Libero, Ablauf.Alles, 4)}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="container-md mt-5">
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#deleteAllStats">delete all stats</button>
      </div>
      <div class="modal fade" id="deleteAllStats" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"><strong>Do you really want to delete all stats?</strong></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>There will be no way of getting them back</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" @click="deleteAllStats" >Delete All Stats</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteStatsByPosition" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"><strong>Do you really want to delete the stats for this section?</strong></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>There will be no way of getting them back</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" @click="deleteStatsByPosition(currentPos)" >Delete Stats</button>
            </div>
          </div>
        </div>
      </div>
      <!--<span>{{stats}}</span>-->
    </div>
</template>

<style scoped>

</style>