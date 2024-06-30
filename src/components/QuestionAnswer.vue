<script setup lang="ts">

import { onMounted, ref, type Ref } from 'vue'
import axios from 'axios'
import imgLaeufer1_5_6 from '@/assets/Läufer1,5,6_Grundaufstellung.png'
import imgLaeufer2_3_4 from '@/assets/Läufer2,3,4_Grundaufstellung.png'
import imgQ1Laeufer from '@/assets/q1laeufer.png'
import imgQ2Laeufer from '@/assets/q2laeufer.png'
import imgQ3Laeufer from '@/assets/q3laeufer.png'
import imgQ4Laeufer from '@/assets/q4laeufer.png'
import imgQ5Laeufer from '@/assets/q5laeufer.png'
import imgQ6Laeufer from '@/assets/q6laeufer.png'
import imgQuestionGrundaufstellung from '@/assets/qgrundaufstellung.png'
import imgLaeufer1Aufschlag from '@/assets/Läufer1.png'
import imgLaeufer2Aufschlag from '@/assets/Läufer2.png'
import imgLaeufer3Aufschlag from '@/assets/Läufer3.png'
import imgLaeufer4Aufschlag from '@/assets/Läufer4.png'
import imgLaeufer5Aufschlag from '@/assets/Läufer5.png'
import imgLaeufer6Aufschlag from '@/assets/Läufer6.png'
import l1 from '@/assets/l1An.png'
import l2 from '@/assets/l2An.png'
import l3 from '@/assets/l3An.png'
import l4 from '@/assets/l4An.png'
import l5 from '@/assets/l5An.png'
import l6 from '@/assets/l6An.png'
import l1l from '@/assets/lmgAnLsgL1.png'
import l2l from '@/assets/lmgAnLsgL2.png'
import l3l from '@/assets/lmgAnLsgL3.png'
import l4l from '@/assets/lmgAnLsgL4.png'
import l5l from '@/assets/lmgAnLsgL5.png'
import l6l from '@/assets/lmgAnLsgL6.png'

defineProps<{title: string}>()

//types
type Question = {id: number, rotation: string; ablauf:string; position:string; pictures:string[]; answer:Answer}
type Answer = {pictures: string[]; answers: any[]}
type StatId = {id:number; rating:number}
type Stat = {id:StatId; anzahl:number}
type ModeSelection = {position: string, ablauf: string, rotation: string}

//storage
const questions: Question[] = [
  {
    id: 1,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Außenangreifer1",
    pictures: [imgQ1Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer1Aufschlag , imgLaeufer1_5_6],
      answers: ["E", 4],
    }
  },
  {
    id: 2,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Außenangreifer1",
    pictures: [l1, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l1l, imgLaeufer1_5_6],
      answers: ["E", 4],
    }
  },
  {
    id: 3,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Außenangreifer1",
    pictures: [imgQ2Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer2Aufschlag, imgLaeufer2_3_4],
      answers: ["C", 4],
    }
  },
  {
    id: 4,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Außenangreifer1",
    pictures: [l2, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l2l, imgLaeufer2_3_4],
      answers: ["B", 4],
    }
  },
  {
    id: 5,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Außenangreifer1",
    pictures: [imgQ3Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer3Aufschlag, imgLaeufer2_3_4],
      answers: ["A", 4],
    }
  },
  {
    id: 6,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Außenangreifer1",
    pictures: [l3, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l3l, imgLaeufer2_3_4],
      answers: ["A", 4],
    }
  },
  {
    id: 7,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Außenangreifer1",
    pictures: [imgQ4Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer4Aufschlag, imgLaeufer2_3_4],
      answers: ["A", 6],
    }
  },
  {
    id: 8,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Außenangreifer1",
    pictures: [l4, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l4l, imgLaeufer2_3_4],
      answers: ["D", 6],
    }
  },
  {
    id: 9,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Außenangreifer1",
    pictures: [imgQ5Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer5Aufschlag, imgLaeufer1_5_6],
      answers: ["E", 6],
    }
  },
  {
    id: 10,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Außenangreifer1",
    pictures: [l5, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l5l, imgLaeufer1_5_6],
      answers: ["D", 6],
    }
  },
  {
    id: 11,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Außenangreifer1",
    pictures: [imgQ6Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer6Aufschlag, imgLaeufer1_5_6],
      answers: ["F", 6],
    }
  },
  {
    id: 12,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Außenangreifer1",
    pictures: [l6, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l6l, imgLaeufer1_5_6],
      answers: ["C", 6],
    }
  },
  {
    id: 13,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgQ1Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer1Aufschlag, imgLaeufer1_5_6],
      answers: ["D", 3],
    }
  },
  {
    id: 14,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [l1, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l1l, imgLaeufer1_5_6],
      answers: ["C", 3],
    }
  },
  {
    id: 15,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgQ2Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer2Aufschlag, imgLaeufer2_3_4],
      answers: ["B", 3],
    }
  },
  {
    id: 16,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [l2, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l2l, imgLaeufer2_3_4],
      answers: ["A", 3],
    }
  },
  {
    id: 17,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgQ3Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer3Aufschlag, imgLaeufer2_3_4],
      answers: ["B", 5],
    }
  },
  {
    id: 18,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [l3, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l3l, imgLaeufer2_3_4],
      answers: ["B", 5],
    }
  },
  {
    id: 19,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgQ4Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer4Aufschlag, imgLaeufer2_3_4],
      answers: ["B", 5],
    }
  },
  {
    id: 20,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [l4, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l4l, imgLaeufer2_3_4],
      answers: ["D", 5],
    }
  },
  {
    id: 21,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgQ5Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer5Aufschlag, imgLaeufer1_5_6],
      answers: ["A", 5],
    }
  },
  {
    id: 22,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [l5, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l5l, imgLaeufer1_5_6],
      answers: ["E", 5],
    }
  },
  {
    id: 23,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Mittelblocker",
    pictures: [imgQ6Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer6Aufschlag, imgLaeufer1_5_6],
      answers: ["D", 3],
    }
  },
  {
    id: 24,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Mittelblocker",
    pictures: [l6, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l6l, imgLaeufer1_5_6],
      answers: ["E", 3],
    }
  },
  {
    id: 25,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgQ1Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer1Aufschlag, imgLaeufer1_5_6],
      answers: ["F", 1],
    }
  },
  {
    id: 26,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [l1, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l1l, imgLaeufer1_5_6],
      answers: ["F", 1],
    }
  },
  {
    id: 27,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgQ2Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer2Aufschlag, imgLaeufer2_3_4],
      answers: ["F", 2],
    }
  },
  {
    id: 28,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [l2, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l2l, imgLaeufer2_3_4],
      answers: ["E", 2],
    }
  },
  {
    id: 29,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgQ3Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer3Aufschlag, imgLaeufer2_3_4],
      answers: ["C", 2],
    }
  },
  {
    id: 30,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [l3, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l3l, imgLaeufer2_3_4],
      answers: ["C", 2],
    }
  },
  {
    id: 31,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgQ4Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer4Aufschlag, imgLaeufer2_3_4],
      answers: ["C", 2],
    }
  },
  {
    id: 32,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [l4, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l4l, imgLaeufer2_3_4],
      answers: ["A", 2],
    }
  },
  {
    id: 33,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgQ5Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer5Aufschlag, imgLaeufer1_5_6],
      answers: ["D", 1],
    }
  },
  {
    id: 34,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [l5, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l5l, imgLaeufer1_5_6],
      answers: ["C", 1],
    }
  },
  {
    id: 35,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Zuspieler",
    pictures: [imgQ6Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer6Aufschlag, imgLaeufer1_5_6],
      answers: ["E", 1],
    }
  },
  {
    id: 36,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Zuspieler",
    pictures: [l6, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l6l, imgLaeufer1_5_6],
      answers: ["C", 1],
    }
  },
  {
    id: 37,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgQ1Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer1Aufschlag, imgLaeufer1_5_6],
      answers: ["C", 2],
    }
  },
  {
    id: 38,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [l1, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l1l, imgLaeufer1_5_6],
      answers: ["A", 2],
    }
  },
  {
    id: 39,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgQ2Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer2Aufschlag, imgLaeufer2_3_4],
      answers: ["D", 1],
    }
  },
  {
    id: 40,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [l2, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l2l, imgLaeufer2_3_4],
      answers: ["C", 1],
    }
  },
  {
    id: 41,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgQ3Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer3Aufschlag, imgLaeufer2_3_4],
      answers: ["E", 1],
    }
  },
  {
    id: 42,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [l3, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l3l, imgLaeufer2_3_4],
      answers: ["E", 1],
    }
  },
  {
    id: 43,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgQ4Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer4Aufschlag, imgLaeufer2_3_4],
      answers: ["F", 1],
    }
  },
  {
    id: 44,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [l4, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l4l, imgLaeufer2_3_4],
      answers: ["F", 1],
    }
  },
  {
    id: 45,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgQ5Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer5Aufschlag, imgLaeufer1_5_6],
      answers: ["F", 2],
    }
  },
  {
    id: 46,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [l5, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l5l, imgLaeufer1_5_6],
      answers: ["F", 2],
    }
  },
  {
    id: 47,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Diagonal-Angreifer",
    pictures: [imgQ6Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer6Aufschlag, imgLaeufer1_5_6],
      answers: ["C", 2],
    }
  },
  {
    id: 48,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Diagonal-Angreifer",
    pictures: [l6, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l6l, imgLaeufer1_5_6],
      answers: ["D", 2],
    }
  },
  {
    id: 49,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgQ1Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer1Aufschlag, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 50,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [l1, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l1l, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 51,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgQ2Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer2Aufschlag, imgLaeufer2_3_4],
      answers: ["F", 4],
    }
  },
  {
    id: 52,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [l2, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l2l, imgLaeufer2_3_4],
      answers: ["F", 4],
    }
  },
  {
    id: 53,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgQ3Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer3Aufschlag, imgLaeufer2_3_4],
      answers: ["F", 4],
    }
  },
  {
    id: 54,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [l3, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l3l, imgLaeufer2_3_4],
      answers: ["F", 4],
    }
  },
  {
    id: 55,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgQ4Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer4Aufschlag, imgLaeufer2_3_4],
      answers: ["F", 4],
    }
  },
  {
    id: 56,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [l4, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l4l, imgLaeufer2_3_4],
      answers: ["F", 4],
    }
  },
  {
    id: 57,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgQ5Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer5Aufschlag, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 58,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [l5, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l5l, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 59,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Libero",
    pictures: [imgQ6Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer6Aufschlag, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 60,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Libero",
    pictures: [l6, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l6l, imgLaeufer1_5_6],
      answers: ["F", 4],
    }
  },
  {
    id: 61,
    rotation: "Läufer 1",
    ablauf: "Aufschlag",
    position: "Außenangreifer2",
    pictures: [imgQ1Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer1Aufschlag, imgLaeufer1_5_6],
      answers: ["A", 6],
    }
  },
  {
    id: 62,
    rotation: "Läufer 1",
    ablauf: "Annahme",
    position: "Außenangreifer2",
    pictures: [l1, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l1l, imgLaeufer1_5_6],
      answers: ["B", 6],
    }
  },
  {
    id: 63,
    rotation: "Läufer 2",
    ablauf: "Aufschlag",
    position: "Außenangreifer2",
    pictures: [imgQ2Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer2Aufschlag, imgLaeufer2_3_4],
      answers: ["E", 6],
    }
  },
  {
    id: 64,
    rotation: "Läufer 2",
    ablauf: "Annahme",
    position: "Außenangreifer2",
    pictures: [l2, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l2l, imgLaeufer2_3_4],
      answers: ["D", 6],
    }
  },
  {
    id: 65,
    rotation: "Läufer 3",
    ablauf: "Aufschlag",
    position: "Außenangreifer2",
    pictures: [imgQ3Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer3Aufschlag, imgLaeufer2_3_4],
      answers: ["F", 6],
    }
  },
  {
    id: 66,
    rotation: "Läufer 3",
    ablauf: "Annahme",
    position: "Außenangreifer2",
    pictures: [l3, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l3l, imgLaeufer2_3_4],
      answers: ["F", 6],
    }
  },
  {
    id: 67,
    rotation: "Läufer 4",
    ablauf: "Aufschlag",
    position: "Außenangreifer2",
    pictures: [imgQ4Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer4Aufschlag, imgLaeufer2_3_4],
      answers: ["E", 2],
    }
  },
  {
    id: 68,
    rotation: "Läufer 4",
    ablauf: "Annahme",
    position: "Außenangreifer2",
    pictures: [l4, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l4l, imgLaeufer2_3_4],
      answers: ["C", 2],
    }
  },
  {
    id: 69,
    rotation: "Läufer 5",
    ablauf: "Aufschlag",
    position: "Außenangreifer2",
    pictures: [imgQ5Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer5Aufschlag, imgLaeufer1_5_6],
      answers: ["C", 2],
    }
  },
  {
    id: 70,
    rotation: "Läufer 5",
    ablauf: "Annahme",
    position: "Außenangreifer2",
    pictures: [l5, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l5l, imgLaeufer1_5_6],
      answers: ["B", 2],
    }
  },
  {
    id: 71,
    rotation: "Läufer 6",
    ablauf: "Aufschlag",
    position: "Außenangreifer2",
    pictures: [imgQ6Laeufer, imgQuestionGrundaufstellung],
    answer: {
      pictures: [imgLaeufer6Aufschlag, imgLaeufer1_5_6],
      answers: ["A", 2],
    }
  },
  {
    id: 72,
    rotation: "Läufer 6",
    ablauf: "Annahme",
    position: "Außenangreifer2",
    pictures: [l6, imgQuestionGrundaufstellung],
    answer: {
      pictures: [l6l, imgLaeufer1_5_6],
      answers: ["A", 2],
    }
  }

]
const stats: Ref<Stat[]> = ref([])

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
let phase: Ref<number> = ref(1)

//selected
let currentQuestions: Question[] = questions
let selectedOption = ref(0)
const selection: Ref<ModeSelection> = ref({position:"", ablauf:"", rotation:""})
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
    currentQuestions = selection.value.rotation === "Gemischt" ?
      questions
        .filter(q => q.position == selection.value.position)
        .sort(() => Math.random() - 0.5)
      : questions
      .filter(q => q.position == selection.value.position)
        .reverse()
  }
  else {
    currentQuestions = selection.value.rotation === "Gemischt" ?
      questions
        .filter(q => q.position == selection.value.position
          && q.ablauf == selection.value.ablauf)
        .sort(() => Math.random() - 0.5)
      : questions
      .filter(q => q.position == selection.value.position
      && q.ablauf == selection.value.ablauf)
        .reverse()
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

function saveStat(questionId: number, attempts: number, anzahl:number) {
  const id:StatId = {
    id: questionId,
    rating: attempts > 6 ? 1 : (attempts > 4 ? 2 : (attempts > 2 ? 3 : 4)),
  }
  const stat:Stat = {
    id: id,
    anzahl: anzahl
  }
  stats.value.includes(stat) ? updateStat(stat) : createStat(stat)
}

function requestStats() {
  axios
    .get<Stat[]>(`${url}/stats`)
    .then((response) => stats.value = response.data)
    .catch((error) => console.log(error))
}

function createStat(stat:Stat) {
  axios
    .post<Stat>(`${url}/stats`, stat)
    .catch((error) => console.log(error))
}

function updateStat(stat:Stat) {
  axios
    .put<Stat>(`${url}/stats`, stat)
    .then(requestStats)
    .catch((error) => console.log(error))
}

onMounted(() => {
  requestStats()
})
</script>

<template>
  <div class="container-fluid mt-4 p-0" v-if="selectionVisible===true">
  <h1 class="display-3 text-center mb-4">Wähle die Spielmodi &#128039;</h1>
  <div class="container shadow mt-4 p-4 bg-dark-subtle rounded-2">
    <h6>Wähle die gewünschte Position</h6>
    <select class="form-select" v-model="selection.position">
      <option disabled value="">Position</option>
      <option>Außenangreifer1</option>
      <option>Außenangreifer2</option>
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
        <h5 v-if="phase===1">- Wer bist du? -</h5>
        <h5 v-if="phase===2">- Auf welcher Position bist du in der Grundaufstellung? -</h5>
      </div>
      <div class="card-body">
        <h3 class="card-title">{{currentQuestions[index].rotation}} -
          {{currentQuestions[index].ablauf}}</h3>
          <div class="card-text" v-if="selectedQuestionId || selectedQuestionId === 0">
            <img :src="pathQuestionPic" width="300" height="290" alt="picture"/>
          </div>
        <div class="selectAnswer" v-if="phase===1">
          <select v-model="selectedOption" @change="submitVisible = true">
            <option disabled value="">Please select your answer</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>E</option>
            <option>F</option>
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

  <div class="container-xl mt-5" v-if="answered">
  <div class="card text-center shadow border-dark mx-2">
    <div class="card-header bg-dark-subtle border-secondary">
      <h4 v-if="attempts===2">Du hast {{attempts}} Versuche gebraucht, besser geht's nicht!</h4>
      <h4 v-if="attempts<5 && attempts>2">Du hast nur {{attempts}} Versuche gebraucht, super!</h4>
      <h4 v-if="attempts<7 && attempts>4">Du hast {{attempts}} Versuche gebraucht, nicht schlecht!</h4>
      <h4 v-if="attempts>6">Schade, du hast {{attempts}} Versuche gebraucht, das geht besser!</h4>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <img :src="pathAnswerPics[0]" width="300" height="290" alt="picture"/>
        </div>
        <div class="col">
          <img :src="pathAnswerPics[1]" width="300" height="290" alt="picture"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5>Das ist dein Laufweg</h5>
        </div>
        <div class="col">
          <h5>Hier die Grundaufstellung</h5>
        </div>
      </div>
    </div>
    <div class="card-footer text-body-secondary bg-dark-subtle border-secondary">
      <button class="btn btn-outline-success shadow d-grid gap-2 col-6 mx-auto mb-3 mt-3" v-if="!quizEnd" @click="
    saveStat(selectedQuestionId, attempts, 1); nextQuestion()">Next Question</button>
      <button class="btn btn-outline-success shadow d-grid gap-2 col-6 mx-auto mb-3 mt-3" v-if="quizEnd" @click="
    saveStat(selectedQuestionId, attempts, 1); endQuiz()">End Quiz</button>
    </div>
  </div>
  </div>

<!--  <div class="list-group">
    DEBUG:
    Attempts={{ attempts }}
    Phase={{phase}}
    ID={{selectedQuestionId}}
    Index={{index}}
  </div>
-->

</template>

<style scoped>

</style>