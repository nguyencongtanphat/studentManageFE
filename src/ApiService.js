import axios from "axios";

//const urlServer = "https://student-management-lu0c.onrender.com"
const urlServer = "http://localhost:3000";

class ApiService{
    static get = async (reqUrl)=>{
        try{
          const response =  await axios.get(urlServer + "/" + reqUrl);
          return response.data.ResponseResult.result;
        }catch(e){
            throw e;
        }
    }
}
export default ApiService;

