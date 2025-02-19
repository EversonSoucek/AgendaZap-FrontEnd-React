import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5235/zapagenda/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api