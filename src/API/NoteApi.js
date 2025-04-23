import api from "../Helper/api.js";

export const AddNoteRequest = async (noteObj) => {
    return await api.post(`note`,noteObj);
};

export const DeleteNoteRequest = async (id) => {
    return await api.delete(`note/${id}`);
};

export const GetNoteRequest = async (id) => {
    return await api.get(`note/${id}`);
};

export const NoteGetAllRequests = async () => {
    return await api.get(`note/all`);
}