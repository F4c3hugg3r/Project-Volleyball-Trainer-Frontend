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
type StatId = {id:number; rating:number}
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
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 4,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 5,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 6,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 7,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 8,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 9,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 10,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 11,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 12,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Außenangreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 13,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 14,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [imgLaeufer2_3_4, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 15,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 16,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 17,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 18,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 19,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 20,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 21,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 22,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 23,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 24,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 25,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 26,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [imgLaeufer2_3_4, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 27,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 28,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 29,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 30,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 31,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 32,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 33,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 34,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 35,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 36,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 37,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 38,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer2_3_4, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 39,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 40,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 41,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 42,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 43,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 44,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 45,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 46,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 47,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 48,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 49,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 50,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [imgLaeufer2_3_4, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 51,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 52,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 53,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 54,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 55,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 56,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 57,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 58,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 59,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgLaeufer1_5_6, imgLaeufer1_AA_An],
    answer: {
      pictures: [imgLaeufer1_AA_An, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 60,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Libero",
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
  if(selection.value.ablauf === "Alles") {
    currentQuestions = selection.value.rotation === "gemischt" ?
      questions
        .filter(q => q.position == selection.value.position)
        .sort(() => Math.random() - 0.5)
      : questions
      .filter(q => q.position == selection.value.position)
  }
  else {
    currentQuestions = selection.value.rotation === "gemischt" ?
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

function updateStats(questionId: number, attempts: number, anzahl:number) {
  const id:StatId = {
    id: questionId,
    rating: attempts > 6 ? 1 : (attempts > 4 ? 2 : (attempts > 2 ? 3 : 4)),
  }
  const stat:Stat = {
    id: id,
    anzahl: anzahl
  }

  axios
    .post<Stat>(`${url}/stats`, stat)
    .catch((error) => console.log(error))
}

</script>

<template>
  <div class="container-fluid mt-4 p-0" v-if="selectionVisible===true">
  <h1 class="display-3 text-center mb-4">Wähle die Spielmodi &#128039;</h1>
  <div class="container shadow mt-4 p-4 bg-dark-subtle rounded-2">
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
  <div class="container shadow mt-4 p-4 bg-dark-subtle rounded-2">
    <h6>Wähle den gewünschten Ablauf</h6>
    <select class="form-select" v-model="selection.ablauf">
      <option disabled value="">Ablauf</option>
      <option>Aufschlag</option>
      <option>Annahme</option>
      <option>Alles</option>
    </select>
  </div>
  <div class="container shadow mt-4 p-4 bg-dark-subtle rounded-2">
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

  <div class="container-xl mt-5" v-if="!selectionVisible && !answered">
    <div class="card text-center shadow border-dark mx-2">
      <div class="card-header bg-dark-subtle border-secondary">
        <h5 v-if="phase===1">- Wo stehst du? -</h5>
        <h5 v-if="phase===2">- Wohin läufst du? -</h5>
      </div>
      <div class="card-body">
        <h3 class="card-title">{{currentQuestions[index].rotation}} -
          {{currentQuestions[index].ablauf}}</h3>
          <div class="card-text" v-if="selectedQuestionId || selectedQuestionId === 0">
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
      </div>
      <div class="card-footer text-body-secondary bg-dark-subtle border-secondary">
          <button class="btn btn-outline-success shadow d-grid gap-2 col-6 mx-auto mb-3 mt-2" v-if="submitVisible" @click="checkAnswer(selectedOption, selectedQuestionId, phase)">submit</button>
          <p v-if="lastQuestion === true"> Gratuliere, das ist die richtige Antwort!</p>
          <p v-else-if="lastQuestion === false" > Schade, leider falsch. Überlege noch einmal! </p>
      </div>
    </div>
    <!-- <div class="d-flex justify-content-start align-items-start mt-4">
      <button class="btn btn-secondary ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> Quick Stats</button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          ...
        </div>
      </div>
    </div> -->
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

  <div class="list-group">
    DEBUG:
    Attempts={{ attempts }}
    Phase={{phase}}
    ID={{selectedQuestionId}}
    Index={{index}}
  </div>

</template>

<style scoped>

</style>