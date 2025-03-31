import axios from "axios";
import {setCookie} from "./Cokkie.js";
const BaseUrl="http://localhost:5094/api/"

export const LoginRequest =async (loginObj)=> {
    const response =await axios.post(`${BaseUrl}auth/login`, loginObj)
    setCookie("token",response.data.data.token,1);
    return response;
}