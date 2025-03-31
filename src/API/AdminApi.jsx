import axios from "axios";


const BaseUrl="http://localhost:5094/api/"

export const ApproveRequest =async (id)=> {
    const response =await axios.patch(`${BaseUrl}admin/approve/writer/${id}`)
    return response;
}
