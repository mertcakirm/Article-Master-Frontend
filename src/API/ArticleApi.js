import api from "../Helper/api.js";

//article detail
export const GetArticleRequest = async (id) => {
    return await api.get(`article/${id}`, {
        headers: {NoAuth: true}
    });
};

//add article
export const AddArticleRequest = async (newArticleObj) => {
    return await api.post("article", newArticleObj);
};

//delete article
export const DeleteArticleRequest = async (id) => {
    return await api.delete(`article/${id}`);
};

//article get all
export const GetArticlesRequest = async (Page, Size, search) => {
    return await api.get(`article/paged/all?PageNumber=${Page}&PageSize=${Size}&ArticleNameSearch=${search}`, {
        headers: {NoAuth: true}
    });
};

//article popular get all
export const GetPopularArticlesRequest = async () => {
    return await api.get(`article/popular`, {
        headers: {NoAuth: true}
    });
};

export const AddCommentRequest = async (newCommentData) => {
    return await api.post("comment", newCommentData);
};

export const GetAllCommentsRequest = async (page, size, id) => {
    return await api.get(`comment/${id}?PageNumber=${page}&PageSize=${size}`, {
        headers: {NoAuth: true}
    });
};

export const IncreaseArticleViewCountRequest = async (id) => {
    return await api.patch(`article/${id}`);
};

export const GetWriterArticleRequest = async (page, size, id) => {
    return await api.get(`/article/writer/all?Id=${id}&PageNumber=${page}&PageSize=${size}`, {
        headers: {NoAuth: true}
    });
};