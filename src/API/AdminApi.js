import api from "../Helper/api.js";

export const ApproveRequest =async (id)=> {
    return await api.patch(`admin/approve/writer/${id}`);
}

export const RejectRoleRequest =async (id)=> {
    return await api.patch(`admin/decline/writer/${id}`);
}


export const WriterGetAllRequest =async (page,size)=> {
    return await api.get(`admin/writer/all?PageNumber=${page}&PageSize=${size}`);
}

export const GetWritersDocumentRequest =async (id)=> {
    return await api.get(`admin/writer/pdf/download/${id}`);
}

export const GetUsersRequests =async (page,size,search)=> {
    return await api.get(`admin/user/all?pageNumber=${page}&pageSize=${size}&usernameSearch=${search}`);
}

export const DeleteUsersRequest =async (id)=> {
    return await api.delete(`admin/user/delete/${id}`);
}
