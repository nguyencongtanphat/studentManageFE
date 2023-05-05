import axios from "axios";

const urlServer = "https://student-management-lu0c.onrender.com"

class ApiService{
    static get = async (reqUrl)=>{
        try{
          return await axios.get(urlServer + "/" + reqUrl);
        }catch(e){
            throw e;
        }
    }
}
export default ApiService;

