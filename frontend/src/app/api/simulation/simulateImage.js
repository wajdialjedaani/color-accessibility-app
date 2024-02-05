import axios from 'axios'
import { baseUrl } from '../../constants';
export async function simulateImage(image, paramType) {
    const formData = new FormData;
    formData.append('image', image)
    formData. append('simulateType', paramType)
    return await axios.post(`${baseUrl}simulation/`, formData, {
            headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
        params: {
            simulateType: paramType,
        },
    })
    .then(async (response) => {
        console.log(response.data)
        return response.data
    })
    .catch((err) => console.log(err));
}