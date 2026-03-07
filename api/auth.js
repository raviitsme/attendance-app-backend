import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:3000/auth",
    withCredentials : true
});

export const loginUser = (data) => API.post('/login', data);
export const signupUser = (data) => API.post('/register',  data);
