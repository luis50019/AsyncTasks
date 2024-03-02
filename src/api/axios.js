import axios from "axios";
const URL_BASE = 'http://localhost:4000'
const instance = axios.create({
	baseURL: URL_BASE,
	withCredentials: true
})

export default instance;