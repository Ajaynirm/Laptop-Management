import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    //to add cookoies for every request ,so i use , essential for private api access
    withCredentials: true
});