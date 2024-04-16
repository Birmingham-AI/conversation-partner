<template>
  <div class="container">
    <form v-if="questions.length === 0" @submit.prevent="submitQuery">
      <div v-if="isLoading" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <h3>
        Please enter your attributes
      </h3>

      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" required>

      <label for="language">Language To Practice</label>
      <input type="text" id="language" v-model="language" required>

      <label for="skillLevel">Skill Level</label>
      <input type="text" id="skillLevel" v-model="skillLevel" required>

      <label for="interests">Interests</label>
      <input type="text" id="interests" v-model="interests" required>

      <label for="age">Age</label>
      <input type="number" id="age" v-model.number="age" required>

      <button type="submit">Generate Conversation</button>
    </form>
    <div v-if="response">
      <h2>Instructions</h2>
      <p>{{ response }}</p>
    </div>
    <Conversation v-if="questions.length > 0" :questions="questions"/>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import generateConversations from "../services/generateConversations.js";
import Conversation from "./Conversation.vue";

export default {
  components: {
    Conversation
  },
  data() {
    return {
      name: "",
      skillLevel: "",
      language: "",
      interests: "",
      age: null,
      response: "",
      questions: [],
      error: null,
      isLoading: false
    }
  },
  methods: {
    async submitQuery() {
      this.isLoading = true
      const query = {
        name: this.name,
        skillLevel: this.skillLevel,
        language: this.language,
        interests: this.interests,
        age: this.age
      };

      try {
        const res = await generateConversations.generateConversation(query);
        this.response = res.data.summary;
        this.questions = res.data.questions;
        this.isLoading = false

      } catch (error) {
        console.error("Error generating conversation", error);
        this.error = "An error occurred while generating conversation.";
      }
    }
  }
}

</script>

<style scoped>
form {
  //max-width: 600px;
  //margin: 20px auto;
  //padding: 20px;
  //background: #f9f9f9;
  //border-radius: 8px;
  //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

input[type="text"],
input[type="number"],
button {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #5c67f2;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4a54e1;
}

h2 {
  color: #333;
}

div.response {
  background-color: #e3e3e3;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

div.error {
  color: #ff6b6b;
}

.lds-roller {
  /* change color here */
  color: blue;
}
.lds-roller,
.lds-roller div,
.lds-roller div:after {
  box-sizing: border-box;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7.2px;
  height: 7.2px;
  border-radius: 50%;
  background: currentColor;
  margin: -3.6px 0 0 -3.6px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 62.62742px;
  left: 62.62742px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 67.71281px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 70.90963px;
  left: 48.28221px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 70.90963px;
  left: 31.71779px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 67.71281px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 62.62742px;
  left: 17.37258px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12.28719px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
