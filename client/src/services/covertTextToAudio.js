import axios from "axios";

const url = "http://localhost:3000/convertTextToAudio"

export default {
    convertTextToAudio(query){
        return axios.post(url, query, {responseType: 'blob'})
    }
}