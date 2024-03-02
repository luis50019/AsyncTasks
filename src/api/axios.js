import axios from "axios";

const URL =import.meta.env.VITE_URL_BASE || "https://apiasynctask-dev-mnsm.4.us-1.fl0.io";
const instance = axios.create({
	baseURL: URL,
	withCredentials: true
})

export default instance;