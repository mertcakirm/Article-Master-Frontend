import api from "../Helper/api.js";

export const GetFoldersRequest = async (page,size) => {
    return await api.get(`folder/paged?pageNumber=${page}&pageSize=${size}`);
};

export const AddFolderRequest = async (folderDTO) => {
    return await api.post(`folder`, folderDTO);
}

export const AddNoteRequest = async (noteObj) => {
    return await api.post(`note`, noteObj);
};

export const DeleteNoteRequest = async (id) => {
    return await api.delete(`note/single/${id}`);
};

export const DeleteFolderRequest = async (id) => {
    return await api.delete(`folder?folderId=${id}`);
};

export const DeleteNotesRequest = async (id) => {
    return await api.delete(`note/${id}`);
};

export const GetNoteRequest = async (id) => {
    return await api.get(`note/${id}`);
};

export const NoteGetAllRequests = async (id,page, size) => {
    return await api.get(`note/all?FolderId=${id}&PageNumber=${page}&PageSize=${size}`);
}