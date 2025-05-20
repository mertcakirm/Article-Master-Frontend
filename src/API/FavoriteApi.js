import api from "../Helper/api.js";

export const AddFavoriteRequest = async (favoriteObj) => {
    return await api.post(`favorite`, favoriteObj);
};

export const GetFavoriteRequest = async (pageNum) => {
    return await api.get(`favorite?PageNumber=${pageNum}&PageSize=10`);
};