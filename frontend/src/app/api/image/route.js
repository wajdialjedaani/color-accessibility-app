import axios from 'axios'
import { baseUrl } from '../../constants';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export async function uploadImage (image) {
    return await axios.post(`${baseUrl}color-recognition/`, image, {
            headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
    })
    .then(async (response) => {
        const parsedResponse = await JSON.parse(response.data); 
        response.data = parsedResponse;
        console.log(response);
        return response;
    })
    .catch((err) => console.log(err));
}
