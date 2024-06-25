<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

//datatypes
type StatId = {id: number, rating:number}
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

function getStatPercentageByGamemode(position:Position, ablauf?:Ablauf, rating?:number):number {
  /* 1-12 Aussenangreifer, 13-24 Mittelblocker, 25-36 Zuspieler, 37-48 Diagonalangreifer, 49-60 Libero
  %2 = 1 Aufschlag, %2 = 0 Annahme */
  if(!stats.value) return 0
  let max:number = 48
  let listFiltered: Stat[]

  switch(position) {
    case Position.Aussenangreifer:
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
    default:
      console.log("no fitting position")
      listFiltered = []
  }

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

function countStatsByStatId(statId: StatId):number {
  return stats.value.filter(stat => stat.id === statId).length
}

function countStatsByQuestionId(questionId: number):number {
  return stats.value.filter(stat => stat.id.id === questionId).length
}

function anzahlByQuestionId(questionId: number):number {
  const stat = stats.value.find(stat => stat.id.id === questionId);
  return stat ? stat.anzahl : 0;
}

function sortStats() {
  stats.value.sort((a, b) => a.id.id - b.id.id);
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

onMounted(() => {
  requestStats()
  sortStats()
})
</script>

<template>
    <div class="container-fluid p-5">
    <div class="accordion shadow" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>Außenangreifer</strong>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <h5 class="text-center">Kompletter Fortschritt</h5>
            <div class="progress" role="progressbar" style="height: 25px">
              <div class="progress-bar" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer)) + '%' }">{{getStatPercentageByGamemode(Position.Aussenangreifer)+"%"}}</div>
            </div>
            <p class="mt-4">Aufschlag</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Aufschlag))
              + '%' }">{{getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Aufschlag)+"%"}}</div>
            </div>
            <p class="mt-3">Annahme</p>
            <div class="progress" role="progressbar" style="height: 20px">
              <div class="progress-bar bg-info text-dark" v-bind:style="{ width: (getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Annahme))
              + '%' }">{{getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Annahme)+"%"}}</div>
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
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 1))/4+'%'}">
                <div class="progress-bar bg-info">{{getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 1)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment two" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 2))/4+'%'}">
                <div class="progress-bar bg-success">{{getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 2)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment three" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 3))/4+'%'}">
                <div class="progress-bar">{{getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 3)}}%</div>
              </div>
              <div class="progress" role="progressbar" aria-label="Segment four" aria-valuemax="25"
                   v-bind:style="{width: (getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 4))/4+'%'}">
                <div class="progress-bar bg-black">{{getStatPercentageByGamemode(Position.Aussenangreifer, Ablauf.Alles, 4)}}%</div>
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
            <h5 class="text-center">Kompletter Fortschritt</h5>
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
            <h5 class="text-center">Kompletter Fortschritt</h5>
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
            <h5 class="text-center">Kompletter Fortschritt</h5>
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
            <h5 class="text-center">Kompletter Fortschritt</h5>
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
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#deleteAllStats">delete all Stats</button>
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
      <span>{{stats}}</span>
    </div>
</template>

<style scoped>

</style>