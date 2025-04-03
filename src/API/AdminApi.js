import api from "../Helper/api.js";


export const ApproveRequest =async (id)=> {
    return await api.patch(`admin/approve/writer/${id}`);
}


export const WriterGetAllRequest =async ()=> {
    return await api.get(`admin/writer/all`);
}