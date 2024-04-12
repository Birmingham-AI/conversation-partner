<template>
  <div>
    <h2>Conversation</h2>
    <div v-html="dialogue"></div>
    <Audio :question="currentQuestion" />
    <form v-if="currentQuestionIndex < questions.length" @submit.prevent="submitResponse">
      <input type="text" v-model="userResponse">
      <button>Submit Response</button>
    </form>
    <div class="or">or</div>
    <SendFile @updateResponse="userResponse = $event"/>
    <div v-if="showModal">
      <h2>Feedback</h2>
      <div class="feedback" v-html="analysisResults"></div>
    </div>


  </div>

</template>

<script>
import respondToUser from "../services/respondToUser.js";
import analyzeConversation from "../services/analyzeConversation.js";
import SendFile from "./SendFile.vue";
import Audio from "./Audio.vue"

export default {

  props: {
    questions: Array
  },
  components : {
    SendFile,
    Audio
  },

  data() {
    return {
      userResponse: "",
      currentQuestionIndex: 0,
      currentQuestion: this.questions.at(this.currentQuestionIndex).questionInTargetLanguage,
      dialogue: this.questions.at(0).questionInTargetLanguage,
      analysisResults: "",
      showModal: false
    }
  },
  methods: {
    async submitResponse() {
      const nextQuestion = this.currentQuestionIndex < this.questions.length - 1 ? this.questions[this.currentQuestionIndex + 1] : "That was the final question"

      try {
        const response = {
          previousQuestion: this.questions[this.currentQuestionIndex],
          userResponse: this.userResponse,
          nextQuestion: nextQuestion
        }

        const res = await respondToUser.respond(response)


        this.dialogue += `<br>${this.userResponse}<br>${res.data.questionInTargetLanguage}`;
        this.currentQuestion = res.data.questionInTargetLanguage
        await this.getAnalysis()
        this.userResponse = ""
        this.currentQuestionIndex += 1

      } catch (err) {
        console.log(err)
      }
    },
    async getAnalysis() {
      try {
        const query = {
          dialogue: {
            questionInTargetLanguage: this.questions[this.currentQuestionIndex].questionInTargetLanguage,
            userResponse: this.userResponse
          }
        }
        const res = await analyzeConversation.analyzeResponse(query)
        this.analysisResults = res.data.analysis.replace(/\n/g, '<br>')
        this.showModal = true

      } catch (err) {
        console.log(err)
      }

    }
  }
}

</script>

<style scoped>
div {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  text-align: center;
}

input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

div[role="alert"] {
  color: #D8000C;
  background-color: #FFD2D2;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}

form {
  margin-bottom: 20px;
}

div.or {
  text-align: center;
  margin: 20px 0;
}

audio {
  width: 100%;
  margin-top: 20px;
}

div.feedback {
  margin-top: 20px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
}

div.v-html {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  border-radius: 4px;
}
</style>
