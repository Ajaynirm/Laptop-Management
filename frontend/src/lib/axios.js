import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://laptop-management-3gx1.onrender.com/api",
    withCredentials: true
});


