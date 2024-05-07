<script setup lang="ts">

import WelcomeItem from "@/components/WelcomeItem.vue";
import DocumentationIcon from "@/components/icons/IconDocumentation.vue";
import {ref, type Ref} from "vue";

defineProps<{title: string}>()

type Question = {id: number, text:string; picture:string; answer:Answer}
type Answer = {text:string; picture:string, an:number}

const answers: Ref<Answer[]> = ref([])
let counter: number = 0;
const answerField = ref('')
let questions: Question[] = [
  {
    id: 1,
    text: "Was kostet die Welt?",
    picture: "picture in here",
    answer: {
      text: "Die Welt kostet 5€",
      picture: "answer picture",
      an: 5
    }
  },
  {
    id: 2,
    text: "Was kostet der Mond?",
    picture: "picture2 in here",
    answer: {
      text: "Der Mond kostet 2€",
      picture: "answer picture2",
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
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Quiz</template>
  </WelcomeItem>
</template>

<style scoped>

</style>