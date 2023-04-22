import axios, { AxiosInstance }  from 'axios';

const instance:AxiosInstance = axios.create({
    //baseURL : 'http://localhost:8000'
    baseURL : '/api'
})

export default instance;