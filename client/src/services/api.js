import axios from "axios";

const API = axios.create({
    baseURL:"https://task-dashboard-7.onrender.com/api"
})

//what normally happens without interceptors is
// whenever you make a call axios.post, it goes straight to the backend and does whatever 
// you want(no security checks, no nothing). But interceptors(for req,res) serves as a 
// middleware between the client and the server. They modify requests or handle response
// before it reaches its destination(authentication)

API.interceptors.request.use(config =>{
    //grab the mf token from the browser(LocalStorage)
    // backend is expecting the token to identify the user's token
    const token = localStorage.getItem('token')
    // token exists? attach it to the headers
    if(token) config.headers.Authorization = `Bearer ${token}`
    // return the updated config
    return config;
})

export default API;
