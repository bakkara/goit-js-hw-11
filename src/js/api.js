import axios from "axios";
import { API_KEY, BASE_URL, page} from "./refs";

// axios.defaults.headers.common["x-api-key"] = API_KEY;
// axios.defaults.baseURL = BASE_URL;


async function getIMG(q ='', page) {
    const config = {
    method: 'get',
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        q: q,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 40,
    }
}
    try {
    const response = await axios.get('', config);
        console.log(response);
        return response.data;
  } catch (error) {
    console.log(error);
  }
}

export {getIMG}