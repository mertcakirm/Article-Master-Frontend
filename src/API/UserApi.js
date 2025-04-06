import api from "../Helper/api.js";

export const WriterGetAll = async () => {
    return await api.get(`user/paged/all`
    );
};