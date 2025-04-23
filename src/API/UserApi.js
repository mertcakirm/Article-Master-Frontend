import api from "../Helper/api.js";

export const WriterGetAll = async (page,size) => {
    return await api.get(`user/writer/paged/all?PageNumber=${page}&PageSize=${size}`, {
            headers: { NoAuth: true }
        }
    );
};

export const CheckRoleRequest = async () => {
    return await api.post (`auth/role`)
}

export const GetUserInfoRequest=async () => {
    return await api.get (`user`)
}

export const UpdateProfileRequest = async (userInfoObj) => {
    return await api.patch (`user`,userInfoObj)
}