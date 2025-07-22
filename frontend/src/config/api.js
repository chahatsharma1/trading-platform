import axios from "axios";

export const API_BASE_URL= "https://trading-769822747576.asia-south1.run.app"
const api=axios.create({
    baseURL:API_BASE_URL,
        headers:{
        "Content-Type":"application/json"
    }
})

export default api;