import axios from "axios";

const URL ="https://api-asynctasks.onrender.com"|| "http://localhost:4000";
const instance = axios.create({
	baseURL: URL,
	withCredentials: true
})

export default instance;