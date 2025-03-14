import axios from "axios";

const URL ="https://api-asynctasks.onrender.com";
const instance = axios.create({
	baseURL: URL,
	withCredentials: true
})
//"https://api-asynctasks.onrender.com"
export default instance;