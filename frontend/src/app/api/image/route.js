import axios from 'axios'
import { baseUrl } from '../../constants';
export async function uploadImage (formData) {
    axios.post(`${baseUrl}files/`, formData, {
            headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
    })
    .then((response) => {
        response.label = JSON.parse(response.data.label)
        console.log(response)
        return response
    })
    .catch((err) => console.log(err));
}
export async function getImageById (id) {
    axios.get(`${baseUrl}files/${id}/`, {
        headers: {
            accept: 'application/json',
        }
    })
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((err) => console.log(err));
}
