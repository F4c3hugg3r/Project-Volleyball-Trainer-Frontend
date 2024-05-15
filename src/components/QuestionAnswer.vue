<script setup lang="ts">

import {ref, type Ref} from 'vue';
import imgLaeufer1_5_6 from '@/assets/Läufer1,5,6_Grundaufstellung.png'
import imgLaeufer2_3_4 from '@/assets/Läufer2,3,4_Grundaufstellung.png'

defineProps<{title: string}>()

type Question = {id: number, text:string; picture:string; answer:Answer}
type Answer = {text:string; picture:string, an:number}

let selectedQuestion: Ref<number | undefined> = ref()
const answers: Ref<Answer[]> = ref([])
const answerField = ref('')

let counter: number = 0;
let questions: Question[] = [
  {
    id: 1,
    text: "Läufer I, Annahme: Welche Positionen nehmen die Spieler ein?",
    picture: imgLaeufer1_5_6,
    answer: {
      text: "Richtig ist folgende Aufstellung:",
      picture: "Läufer1_Annahme",
      an: 5
    }
  },
  {
    id: 2,
    text: "Läufer IV, Annahme: Welche Positionen nehmen die Spieler ein?",
    picture: imgLaeufer2_3_4,
    answer: {
      text: "Richtig ist folgende Aufstellung:",
      picture: "Läufer1_Annahme",
      an: 2
    }
  }
]

function initCounter(): void {
  counter = 0
}

function checkAnswer(an: number | undefined, id: number): boolean {
  for (let question of questions) {
    if (question.id == id && question.answer.an == an) {
      counter++
      return true
    }
  }
  return false
}

function getImageUrl(name: string) {
  return new URL(`@/assets/${name}.png`, import.meta.url).href
}

let path = import.meta.url;
let selected: Ref<number> = ref(0)
let lastQuestion = ref()
let answeredOptions: Map<number, number[]> = new Map()
let buttonVisible = ref(true)

</script>

<template>
  <h1>{{title}}</h1>
  <ul class="questions">
    <li v-for="question in questions" :key="question.id">
      <button class="button" @click="
      selectedQuestion=question.id;
      path = questions[selectedQuestion-1].picture;
       ">{{question.text}}</button>
    </li>
  </ul>
  <div class="image" v-if="selectedQuestion || selectedQuestion === 0">
    <img :src="path" width="250" height="290" alt="picture"/>
    <div>
      <select v-model="selected" @change="buttonVisible = true">
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
    <button class="button" v-if="buttonVisible" @click="lastQuestion = checkAnswer(selected, selectedQuestion); buttonVisible = false">submit</button>
      <p v-if="lastQuestion == true"> Congrats, that's the right Answer</p>
      <p v-else-if="lastQuestion == false" > Too bad, that's the wrong answer </p>
      <p>Counter {{counter}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>