<script setup lang="ts">

import { onMounted, ref, type Ref } from 'vue'
import axios from 'axios'
import imgLaeufer1_5_6 from '@/assets/Läufer1,5,6_Grundaufstellung.png'
import imgLaeufer2_3_4 from '@/assets/Läufer2,3,4_Grundaufstellung.png'
import imgLaeufer1_AA_An from '@/assets/Läufer1_Annahme.png'

defineProps<{title: string}>()

//types
type Question = {id: number, rotation: string; ablauf:string; position:string; pictures:string[]; answer:Answer}
type Answer = {pictures: string[]; answers: any[]}
type StatId = {id:string; rating:string}
type Stat = {id:StatId; anzahl:number}
type ModeSelection = {position: string, ablauf: string, rotation: string}

const questions: Question[] = [
  {
    id: 1,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 2,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Außenangreifer",
    pictures: [imgLaeufer2_3_4, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 3,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  }
]

//visibility
let submitVisible = ref(false) //default false
let selectionVisible = ref(true) //default true
let answered = ref(false) //default false
let quizEnd = false //default false

//paths
let pathQuestionPic = import.meta.url;
let pathAnswerPics: string[] = [import.meta.url];
const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

//logic
let attempts: number = 0;
let index = ref(0)

//selected
let currentQuestions: Question[] = questions
let selectedOption = ref(0)
const selection: Ref<ModeSelection> = ref({position:"", ablauf:"", rotation:""})
let phase: Ref<number> = ref(1)
let selectedQuestionId: Ref<number> = ref(-1)
let lastQuestion: Ref<boolean | undefined> = ref()

function checkAnswer(an: number | undefined | string, id: number, currentPhase: number) {
  for (let question of currentQuestions) {
    if(currentPhase === 1) {
      if (question.id == id && question.answer.answers[0] == an) {
        lastQuestion.value = true
        phase.value = 2
        pathQuestionPic = currentQuestions[index.value].pictures[1]
        break
      }
      else lastQuestion.value = false
    } else {
      if (question.id == id && question.answer.answers[1] == an) {
        lastQuestion.value = true
        phase.value = 1
        if(index.value+1 == currentQuestions.length) {
          quizEnd = true
        }
        showAnswerAndContinue()
        break
      }
      else lastQuestion.value = false
    }
  }
  submitVisible.value = false
  attempts++
}

function showAnswerAndContinue() {
  answered.value = true;
  pathAnswerPics = [currentQuestions[index.value].answer.pictures[0], currentQuestions[index.value].answer.pictures[1]];
}

function nextQuestion() {
  attempts = 0
  answered.value = false;
  lastQuestion.value = undefined
  index.value++
  selectedQuestionId.value = currentQuestions[index.value].id
  pathQuestionPic = currentQuestions[index.value].pictures[0]
}

function endQuiz() {
  location.reload()
}

function defineQuestions() {
  if(selection.value.ablauf == "Alles") {
    currentQuestions = selection.value.rotation == "gemischt" ?
      questions
        .filter(q => q.position == selection.value.position)
        .sort(() => Math.random() - 0.5)
      : questions
      .filter(q => q.position == selection.value.position)
  }
  else {
    currentQuestions = selection.value.rotation == "gemischt" ?
      questions
        .filter(q => q.position == selection.value.position
          && q.ablauf == selection.value.ablauf)
        .sort(() => Math.random() - 0.5)
      : questions
      .filter(q => q.position == selection.value.position
      && q.ablauf == selection.value.ablauf)
  }
}

function checkSelection(): boolean {
  return selection.value.ablauf != ""
    && selection.value.position != ""
    && selection.value.rotation != "";
}

function startGame() {
  selectionVisible.value = false
  defineQuestions()
  selectedQuestionId.value = currentQuestions[index.value].id
  pathQuestionPic = currentQuestions[index.value].pictures[0]
}

function updateStats(id: number, attempts: number, anzahl:number) {
  const stat = {
    id: id.toString(),
    rating: attempts > 6 ? "0" : (attempts > 4 ? "1" : (attempts > 2 ? "2" : "3")),
    anzahl:anzahl
  }

  axios
    .post<Stat>(`${url}/stats`, stat)
    .catch((error) => console.log(error))
}

</script>

<template>
  <div class="container-fluid mt-5 p-0" v-if="selectionVisible===true">
  <h1 class="display-3 text-center mb-5">Wähle die Spielmodi &#127952;</h1>
  <div class="container shadow mt-3 p-4 bg-dark-subtle rounded-2">
    <h6>Wähle die gewünschte Position</h6>
    <select class="form-select" v-model="selection.position">
      <option disabled value="">Position</option>
      <option>Außenangreifer</option>
      <option>Mittelblocker</option>
      <option>Zuspieler</option>
      <option>Diagonal-Angreifer</option>
      <option>Libero</option>
    </select>
  </div>
  <div class="container shadow mt-3 p-4 bg-dark-subtle rounded-2">
    <h6>Wähle den gewünschten Ablauf</h6>
    <select class="form-select" v-model="selection.ablauf">
      <option disabled value="">Ablauf</option>
      <option>Aufschlag</option>
      <option>Annahme</option>
      <option>Alles</option>
    </select>
  </div>
  <div class="container shadow mt-3 p-4 bg-dark-subtle rounded-2">
    <h6>Wähle die gewünschte Reihenfolge</h6>
    <select class="form-select" v-model="selection.rotation">
      <option disabled value="">Rotation</option>
      <option>Reihenfolge</option>
      <option>Gemischt</option>
    </select>
  </div>
    <div class="container mt-5 text-center">
      <div class="d-grid gap-2 col-6 mx-auto">
  <button type="button" class="btn btn-outline-success shadow" v-if="checkSelection()"
          @click="startGame()">Start Game!</button>
      </div>
  </div>
  </div>

  <div class="container-fluid mt-2 p-0" v-if="!selectionVisible && !answered">
    <div class="d-flex justify-content-end align-items-start">
    <button class="btn btn-secondary me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> Quick Stats</button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        ...
      </div>
    </div>
    </div>
    <div class="container">
      <h2 class="Ablauf">Spielphase: {{currentQuestions[index].rotation}}
        {{currentQuestions[index].ablauf}}</h2>
      <p class="questionText" v-if="phase===1">"Wo stehst du?"</p>
      <p class="questionText" v-if="phase===2">"Wohin läufst du?"</p>
    <div class="image" v-if="selectedQuestionId || selectedQuestionId === 0">
      <img :src="pathQuestionPic" width="250" height="290" alt="picture"/>
    </div>
      <div class="selectAnswer" v-if="phase===1">
        <select v-model="selectedOption" @change="submitVisible = true">
          <option disabled value="">Please select your answer</option>
          <option>A</option>
          <option>B</option>
          <option>D</option>
          <option>E</option>
          <option>F</option>
          <option>G</option>
        </select>
      </div>
      <div class="selectAnswer" v-if="phase===2">
        <select v-model="selectedOption" @change="submitVisible = true">
          <option disabled value="">Please select your answer</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>

      <div>
        <button class="submitNextButton" v-if="submitVisible" @click="checkAnswer(selectedOption, selectedQuestionId, phase)">submit</button>
        <p v-if="lastQuestion === true"> Gratuliere, das ist die richtige Antwort!</p>
        <p v-else-if="lastQuestion === false" > Schade, leider falsch. Überlege noch einmal! </p>
      </div>
    </div>
  </div>

  <div class="answer" v-if="answered">
  <div class="answerPhase1">
    <h2>Richtig! Du startest hier..</h2>
    <div class="image">
    <img :src="pathAnswerPics[0]" width="250" height="290" alt="picture"/>
      </div>
  </div>
  <div class="answerPhase2">
    <h2>..und läufst dann zur {{currentQuestions[index].answer.answers[1]}}.</h2>
    <h2>Hier die Grundaufstellung:</h2>
    <div class="image">
    <img :src="pathAnswerPics[1]" width="250" height="290" alt="picture"/>
    </div>
  </div>
    <h2 v-if="attempts===2">Du hast {{attempts}} Versuche gebraucht, besser geht's nicht!</h2>
    <h2 v-if="attempts<5 && attempts>2">Du hast nur {{attempts}} Versuche gebraucht, super!</h2>
    <h2 v-if="attempts<7 && attempts>4">Du hast {{attempts}} Versuche gebraucht, nicht schlecht!</h2>
    <h2 v-if="attempts>6">Schade, du hast {{attempts}} Versuche gebraucht, das geht besser!</h2>
    <button class="submitNextButton" v-if="!quizEnd" @click="
    updateStats(selectedQuestionId, attempts, 1); nextQuestion()">Next Question</button>
    <button class="submitNextButton" v-if="quizEnd" @click="
    updateStats(selectedQuestionId, attempts, 1); endQuiz()">End Quiz</button>
  </div>

  <div class="debug">
    <p>Attempts {{ attempts }}</p>
    <p>Phase: {{phase}}</p>
    <p>ID: {{selectedQuestionId}}</p>
    <p>Index: {{index}}</p>
  </div>

</template>

<style scoped>

</style>