import axios from 'axios'
import { baseUrl } from '../../constants';
export async function findSignificantColors (image) {
    return await axios.post(`${baseUrl}significant_colors/`, image, {
            headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
    })
    .then(async (response) => {
        console.log(response.data.palette)
        return response.data.palette
    })
    .catch((err) => console.log(err));
}