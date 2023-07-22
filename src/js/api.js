import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "./refs";

// axios.defaults.headers.common["x-api-key"] = API_KEY;
// axios.defaults.baseURL = BASE_URL;


async function getIMG(q) {
    const config = {
    method: 'get',
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        q: q,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    }
}
    try {
    const response = await axios.get('', config);
        console.log(response);
        return response.data;
  } catch (error) {
    console.error(error);
  }
}

export {getIMG}