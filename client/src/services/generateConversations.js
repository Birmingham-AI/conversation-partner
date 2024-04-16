import axios from "axios";

const url = "http://localhost:3000/generateConversation"

export default {
    generateConversation(query){
        return axios.post(url, query)
    }
}