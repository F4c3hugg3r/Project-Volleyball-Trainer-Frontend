<script setup lang="ts">

import {ref, type Ref} from 'vue';

defineProps<{title: string}>()

type Question = {id: number, text:string; picture:string; answer:Answer}
type Answer = {text:string; picture:string, an:number}

let selectedQuestion: Ref<number | undefined> = ref()
const answers: Ref<Answer[]> = ref([])
let counter: number = 0;
const answerField = ref('')
let questions: Question[] = [
  {
    id: 0,
    text: "Läufer I, Annahme: Welche Positionen nehmen die Spieler ein?",
    picture: "@/assets/Läufer1,5,6_Grundaufstellung.png",
    answer: {
      text: "Richtig ist folgende Aufstellung:",
      picture: "@/assets/Läufer1_Annahme.png",
      an: 5
    }
  },
  {
    id: 1,
    text: "Läufer IV, Annahme: Welche Positionen nehmen die Spieler ein?",
    picture: "@/assets/Läufer2,3,4_Grundaufstellung.png",
    answer: {
      text: "Richtig ist folgende Aufstellung:",
      picture: "@/assets/Läufer1_Annahme.png",
      an: 2
    }
  }
]

function initCounter(): void {
  counter = 0
}

function checkAnswer(an: number, id: number): boolean {
  for (let question of questions) {
    if (question.id === id && question.answer.an === an) {
      counter++
      return true
    }
  }
  return false
}




</script>

<template>
  <h1>{{title}}</h1>
  <ul class="questions">
    <li v-for="question in questions" :key="question.id">
      <button class="button" v-on:click="selectedQuestion=question.id">{{question.text}}</button>
    </li>
  </ul>
  <div class="image" v-if="selectedQuestion || selectedQuestion === 0">
    <p>selected Question = {{selectedQuestion}}</p>
    <img alt="picture Question" class="picture" v-bind:src="questions[selectedQuestion.valueOf()].picture" width="250" height="290"/>
  </div>
</template>

<style scoped>

</style>