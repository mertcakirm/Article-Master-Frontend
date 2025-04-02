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

export const GetArticleRequest = async (id) => {
    return await api.get(`article/article/${id}`,{
        headers: { NoAuth: true }
    });
};

export const AddArticleRequest = async (newArticleObj) => {
    return await api.post("article", newArticleObj);
};

export const DeleteArticleRequest = async (id) => {
    return await api.delete(`article/${id}`);
};

export const GetArticlesRequest = async (Page, Size) => {
    return await api.get(`article/paged/all?PageNumber=${Page}&PageSize=${Size}`,{
        headers: { NoAuth: true }
    });
};


export const AddCommentRequest = async (newCommentData) => {
    return await api.post("comment", newCommentData);
};


export const GetAllCommentsRequest = async (id) => {
    return await api.get(`comment/${id}`,{
        headers: { NoAuth: true }
    });
}

export const IncreaseArticleViewCountRequest = async (id) => {
    return await api.patch(`article/${id}`);
}