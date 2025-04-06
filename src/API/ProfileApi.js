import api from "../Helper/api.js";

export const UpdateProfilePhotoRequest = async (base64String) => {
    return await api.post(`user/upload/photo`, {
        PhotoBase64: base64String
    });
};