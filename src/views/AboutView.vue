<script>
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { QuestionAnswer }
})


</script>

<template>
  <main>
  <div class="quiz-container dark">
    <div class="header">
      <div class="header-item">Quiz</div>
      <div class="header-item">Profile</div>
    </div>
    <div class="content">
      <div class="sidebar">
        <div class="sidebar-item">Position</div>
        <div class="sidebar-item">Spielablauf</div>
        <div class="sidebar-item">Rotation</div>
      </div>
      <div class="main">
        <div class="question">
          <QuestionAnswer title="Quiz"/>
        </div>
        <div class="answer">
          <div class="answer-content">Antwort inkl. Bild</div>
        </div>
        <div class="actions">
          <button class="action-button">eigene Antwort</button>
          <button class="action-button">submit</button>
          <button class="action-button">leave</button>
        </div>
      </div>
      <div class="progress">Progress</div>
    </div>
  </div>
  </main>
</template>


<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #f0f0f0;
  background-color: #222;
}

.dark {
  color: #f0f0f0;
  background-color: #222;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: #181818;
}

.header-item {
  margin: 0 10px;
}

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #333;
}

.sidebar-item {
  margin: 5px 0;
}

.main {
  flex: 1;
  padding: 20px;
}

.question,
.answer {
  border: 1px solid #555;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #333;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.action-button {
  margin-left: 10px;
  color: #f0f0f0;
  background-color: #555;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #666;
}

.progress {
  padding: 10px;
  background-color: #333;
}
</style>