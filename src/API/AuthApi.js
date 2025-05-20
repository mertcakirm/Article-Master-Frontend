import {setCookie} from "./Cokkie.js";
import api from "../Helper/api.js";

export const LoginRequest = async (loginObj) => {
    const response = await api.post("auth/login", loginObj);
    setCookie("token", response.data.data.token, 1);
    return response;
};

export const SignRequest = async (signObj) => {
    return await api.post("auth/user/register", signObj);
};

export const WriterSignRequest = async (writerObj) => {
    return await api.post("auth/writer/register", writerObj);
};