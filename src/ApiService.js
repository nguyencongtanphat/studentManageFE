import axios from "axios";

//const urlServer = "https://student-management-lu0c.onrender.com"
const urlServer = "http://localhost:3000";

class ApiService {
  static get = async (reqUrl) => {
    try {
      const response = await axios.get(urlServer + "/" + reqUrl);
      return response.data.ResponseResult.result;
    } catch (e) {
      throw new Error(e.response.data.ResponseResult.Message);
    }
  };
  static put = async (reqUrl, data) => {
    try {
      const url = urlServer + "/" + reqUrl;
      const response = await axios.put(url, data);
      return response;
    } catch (e) {
      throw new Error(e.response.data.ResponseResult.Message);
    }
  };

  static post = async (reqUrl, body) => {
    try {
      console.log("POST:", urlServer + "/" + reqUrl);
      const response = await axios.post(urlServer + "/" + reqUrl, body);
      console.log("response", response);
      return response.data.ResponseResult.result;
    } catch (e) {
      throw new Error(e.response.data.ResponseResult.Message);
    }
  };

  static delete = async (reqUrl)=>{
    try {
      console.log("DELETE:", urlServer + "/" + reqUrl);
      const response = await axios.delete(urlServer + "/" + reqUrl);
      console.log("response", response);
      return response.data.ResponseResult;
    } catch (e) {
      throw new Error(e.Message);
    }
  }
}
export default ApiService;
