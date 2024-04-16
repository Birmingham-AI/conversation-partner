import axios from "axios";

const url = "http://localhost:3000/convertAudioToText"

export default {
    convertAudioToText(file){
        return axios.post(url, file)
    }
}