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
    static put = async (reqUrl,data) => {
        try {
            const url = urlServer + "/" + reqUrl;
            const response = await axios.put(url, data);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}
export default ApiService;

