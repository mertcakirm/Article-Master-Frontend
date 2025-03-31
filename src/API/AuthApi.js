import axios from "axios";
import {setCookie} from "./Cokkie.js";
const BaseUrl="http://localhost:5094/api/"

export const LoginRequest =async (loginObj)=> {
    const response =await axios.post(`${BaseUrl}auth/login`, loginObj)
    setCookie("token",response.data.data.token,1);
    return response;
}


export const SignRequest =async (signObj)=> {
    const response =await axios.post(`${BaseUrl}auth/user/register`, signObj)
    return response;
}

export const WriterSignRequest =async (writerObj)=> {
    const response =await axios.post(`${BaseUrl}auth/writer/register`, writerObj)
    return response;
}