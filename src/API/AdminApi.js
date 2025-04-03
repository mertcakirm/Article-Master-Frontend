import api from "../Helper/api.js";


export const ApproveRequest =async (id)=> {
    return await api.patch(`admin/approve/writer/${id}`);
}
