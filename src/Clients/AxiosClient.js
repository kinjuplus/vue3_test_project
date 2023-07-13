import axios from "axios";

//const baseDomain = "http://localhost:5000";
const baseDomain = "";
const baseURL = `${baseDomain}/api`; 

export default axios.create({
    baseURL,
    /*headers: {
      // "Authorization": "Bearer xxxxx"
    }*/
  });