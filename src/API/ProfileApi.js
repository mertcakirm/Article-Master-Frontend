import axios from "axios";
import {getCookie} from "./Cokkie.js";

const BaseUrl = "http://localhost:5094/api/";

const api = axios.create({
    baseURL: BaseUrl,
});

api.interceptors.request.use((config) => {
    const token = getCookie("token");

    if (!config.headers["NoAuth"] && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    delete config.headers["NoAuth"];
    return config;
});

export const UpdateProfilePhotoRequest = async (PhotoObj) => {
    return await api.post(`user/upload/photo`, PhotoObj,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

