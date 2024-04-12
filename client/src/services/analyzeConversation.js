import axios from "axios";

const url = "http://localhost:3000/analyzeUserResponse"

export default {
    analyzeResponse(dialogue){
        return axios.post(url, dialogue)
    }
}