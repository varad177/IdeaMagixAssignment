import axios from "axios";

const BACE_URL = "";
const axiosinstance = axios.create();
axiosinstance.defaults.baseURL = BACE_URL;
 axiosinstance.defaults.withCredentials = true;

export default axiosinstance;
