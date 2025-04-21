import api from "../Helper/api.js";

export const AddFavoriteRequest = async (favoriteObj) => {
    return await api.post(`favorite`,favoriteObj);
};

export const GetFavoriteRequest = async () => {
    return await api.get(`favorite`);
};