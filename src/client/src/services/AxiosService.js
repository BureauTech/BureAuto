import axios from "axios"

export default axios({
    baseURL: process.env.SERVER_URL
})