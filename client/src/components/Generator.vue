<template>
  <div>
    Please enter your attributes
  </div>
  <form v-if="questions.length === 0" @submit.prevent="submitQuery">
    <label for="name">Name</label>
    <input type="text" id="name" v-model="name" required>

    <label for="skillLevel">Skill Level</label>
    <input type="text" id="skillLevel" v-model="skillLevel" required>

    <label for="language">Language</label>
    <input type="text" id="language" v-model="language" required>

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
      error: null
    }
  },
  methods: {
    async submitQuery() {
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
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
</style>
