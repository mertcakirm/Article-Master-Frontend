import axios from "axios";


const BaseUrl="http://localhost:5094/api/"

export const GetArticleRequest =async (id)=> {
    const response =await axios.get(`${BaseUrl}article/article/${id}`)
    return response;

}

export const AddArticleRequest =async (newArticleObj) => {
    const response =await axios.post(`${BaseUrl}article`,newArticleObj)
    return response;

}

export const DeleteArticleRequest =async (id) => {
    const response =await axios.delete(`${BaseUrl}article/${id}`)
    return response;

}


export const GetArticlesRequest =async (Page,Size)=> {
    const response =await axios.get(`${BaseUrl}article/paged/all?PageNumber=${Page}&PageSize=${Size}`)
    return response;

}


export const AddCommentRequest =async (newCommentObj) => {
    const response =await axios.post(`${BaseUrl}comment`,newCommentObj)
    return response;
}