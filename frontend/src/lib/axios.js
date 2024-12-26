import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development"? "http://localhost:5001/api":"/api",
    //to add cookoies for every request ,so i use , essential for private api access
    withCredentials: true
});