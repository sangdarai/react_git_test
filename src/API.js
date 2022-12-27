import axios from "axios";

const API = axios.create({
    baseURL : "http://180.67.126.84:4000",
    headers : {
        'Content-Type': 'application/json',
    } ,
}) ;

export default API;