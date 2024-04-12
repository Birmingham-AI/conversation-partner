<template>
  <div>
    <audio v-if="audio" :src="audio" controls></audio>
  </div>

</template>

<script>
import convertTextToAudio from "../services/covertTextToAudio.js"

export default {
  data(){
    return {
     audio: null
    }
  },
  props: {
    question: String
  },
  watch: {
    question(newQuestion, oldQuestion) {
      if (newQuestion !== oldQuestion) {
        this.getAudio();
      }
    }
  },
  methods: {
    async getAudio(){
      try {
        const query = {
          text: this.question
        }
        const res = await convertTextToAudio.convertTextToAudio(query)
        const audioBlob = new Blob([res.data], { type: 'audio/mpeg' });
        this.audio = URL.createObjectURL(audioBlob);

      } catch(e){
        console.log(e)
      }
    }
  },
  mounted() {
    this.getAudio()
  }
}

</script>


<style scoped>

</style>