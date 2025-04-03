import api from "../Helper/api.js";


export const UpdateProfilePhotoRequest = async (PhotoObj) => {
    return await api.post(`user/upload/photo`, PhotoObj);
};

