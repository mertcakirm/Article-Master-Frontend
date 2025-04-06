import api from "../Helper/api.js";

export const ApproveRequest =async (id)=> {
    return await api.patch(`admin/approve/writer/${id}`);
}


export const WriterGetAllRequest =async (page,size)=> {
    return await api.get(`admin/writer/all?PageNumber=${page}&PageSize=${size}`);
}

export const GetWritersDocumentRequest =async (id)=> {
    return await api.get(`/admin/writer/pdf/download/${id}`);
}

