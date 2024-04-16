import axios from "axios";

const url = "http://localhost:3000/respondToUser"

export default {
    respond(query){
        return axios.post(url, query)
    }
}