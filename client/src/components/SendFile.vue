<template>
  <div>
    <input type="file" @change="handleFile"/>
    <button @click="submitFile">Upload File</button>
  </div>
</template>


<script>
import convertAudioToText from "../services/convertAudioToText.js";

export default {
  components: {
    convertAudioToText
  },

  data() {
    return {
      selectedFile: null
    }
  },
  methods: {
    handleFile(e) {
      this.selectedFile = e.target.files[0]
    },
    async submitFile() {
      if (!this.selectedFile) {
        alert("Please select a file first.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        const userResponse = await convertAudioToText.convertAudioToText(formData);
        this.$emit('updateResponse', userResponse.data.text);

      } catch (e) {
        console.log(e)
      }
    }
  }
}

</script>


<style scoped>

</style>