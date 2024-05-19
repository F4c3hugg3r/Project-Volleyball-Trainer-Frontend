<script setup lang="ts">

import {ref, type Ref} from 'vue';
import imgLaeufer1_5_6 from '@/assets/Läufer1,5,6_Grundaufstellung.png'
import imgLaeufer2_3_4 from '@/assets/Läufer2,3,4_Grundaufstellung.png'
import imgLaeufer1_AA_An from '@/assets/Läufer1_Annahme.png'
import { last } from '@volar/typescript/lib/typescript/core'

defineProps<{title: string}>()

//types
type Question = {id: number, ablauf:string; position:string; text1:string; text2:string; picture1:string; picture2:string; answer:Answer}
type Answer = {text1:string; text2:string; picture1:string, picture2:string; an1:string; an2:number}
type AnsweredQuestion = {id: number, tries:number}
type ModeSelection = {position: string, ablauf: string, rotation: string}

//visibility
let submitVisible = ref(true)
let selectionVisible = ref(true)

//paths
let pathQuestionPic = import.meta.url;
let pathAnswerPic = import.meta.url;

//logic
let counter: number = 0;
let answeredQuestions: AnsweredQuestion[]

const answers: Answer[] = []

const questions: Question[] = [
  {
    id: 1,
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    text1: "Wo stehst du?",
    picture1: imgLaeufer1_5_6,
    text2: "Und wohin läufst du?",
    picture2: imgLaeufer1_AA_An,
    answer: {
      text1: "Richtig ist folgende Aufstellung:",
      picture1: imgLaeufer1_AA_An,
      text2: "Richtig ist folgende Grundaufstellung",
      picture2: imgLaeufer1_5_6,
      an1: "F",
      an2: 4
    }
  },
  {
    id: 2,
    ablauf: "Annahme",
    position: "Außenangreifer",
    text1: "Wo stehst du?",
    picture1: imgLaeufer2_3_4,
    text2: "Und wohin läufst du?",
    picture2: imgLaeufer2_3_4,
    answer: {
      text1: "Richtig ist folgende Aufstellung:",
      picture1: imgLaeufer1_AA_An,
      text2: "Richtig ist folgende Grundaufstellung",
      picture2: imgLaeufer2_3_4,
      an1: "F",
      an2: 4
    }
  },
  {
    id: 3,
    ablauf: "Annahme",
    position: "Mittelblocker",
    text1: "Wo stehst du?",
    picture1: imgLaeufer1_AA_An,
    text2: "Und wohin läufst du?",
    picture2: imgLaeufer1_AA_An,
    answer: {
      text1: "Richtig ist folgende Aufstellung:",
      picture1: imgLaeufer1_5_6,
      text2: "Richtig ist folgende Grundaufstellung",
      picture2: imgLaeufer2_3_4,
      an1: "F",
      an2: 4
    }
  }
]

//selected
let currentQuestions: Question[] = questions
let selectedOption = ref(0)
const selection: Ref<ModeSelection> = ref({position:"", ablauf:"", rotation:""})
let phase: Ref<number> = ref(1)
let selectedQuestion: Ref<number | undefined> = ref()
let lastQuestion: Ref<boolean | undefined> = ref()

function checkAnswer(an: number | undefined | string, id: number, currentPhase: number) {
  for (let question of currentQuestions) {
    if(currentPhase === 1) {
      if (question.id == id && question.answer.an1 == an) {
        counter++
        lastQuestion.value = true
        phase.value = 2
        break
      }
      else lastQuestion.value = false
    } else {
      if (question.id == id && question.answer.an2 == an) {
        counter++
        lastQuestion.value = true
        phase.value = 1
        break
      }
      else lastQuestion.value = false
    }
  }
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
}

</script>

<template>
  <div class="selection" v-if="selectionVisible===true">
  <p>Wählen Sie die Spielmodi :)</p>
  <div class="select">
    <select v-model="selection.position">
      <option disabled value="">Position</option>
      <option>Außenangreifer</option>
      <option>Mittelblocker</option>
      <option>Zuspieler</option>
      <option>Diagonal-Angreifer</option>
      <option>Libero</option>
    </select>
  </div>
  <div class="select">
    <select v-model="selection.ablauf">
      <option disabled value="">Ablauf</option>
      <option>Aufschlag</option>
      <option>Annahme</option>
      <option>Alles</option>
    </select>
  </div>
  <div class="select">
    <select v-model="selection.rotation">
      <option disabled value="">Rotation</option>
      <option>Reihenfolge</option>
      <option>Gemischt</option>
    </select>
  </div>
  <button class="submit" v-if="checkSelection()" @click="startGame()">Start Game!</button>
  </div>



  <ul class="questions">
    <li v-for="question in currentQuestions" :key="question.id">
      <button class="button" @click="
      selectedQuestion=question.id;
      pathQuestionPic = question.picture1;
       ">Läufer: {{question.id}}  Ablauf: {{question.ablauf}}</button>
    </li>
  </ul>

  <div class="image" v-if="selectedQuestion || selectedQuestion === 0">
    <img :src="pathQuestionPic" width="250" height="290" alt="picture"/>

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

    <div class="answerButton">
    <button class="submit" v-if="submitVisible" @click="checkAnswer(selectedOption, selectedQuestion, phase); submitVisible = false">submit</button>
      <p v-if="lastQuestion === true"> Congrats, that's the right Answer</p>
      <p v-else-if="lastQuestion === false" > Too bad, that's the wrong answer </p>
    </div>

    <div class="debug">
      <p>Counter {{counter}}</p>
      <p>Phase: {{phase}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>