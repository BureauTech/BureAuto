import axios from "axios"
import config from "./config"

// Configuração básica do axios
export default axios.create({
    baseURL: config.SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})