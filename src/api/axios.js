import axios from "axios";

const URL =import.meta.env.VITE_URL_BASE || "http://localhost:4000";
const instance = axios.create({
	baseURL: URL,
	withCredentials: true
})

export default instance;