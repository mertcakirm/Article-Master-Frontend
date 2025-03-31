import axios from "axios";


const BaseUrl="http://localhost:5094/api/"

export const GetArticleRequest =async (id)=> {
    const response =await axios.post(`${BaseUrl}article/article/${id}`)
    return response;
}
