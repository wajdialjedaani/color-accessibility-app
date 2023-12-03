import axios from 'axios'
import { baseUrl } from '../../constants';
export async function uploadImage (formData) {
    return await axios.post(`${baseUrl}files/`, formData, {
            headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
    })
    .then(async (response) => {
        const parsedLabel = await JSON.parse(response.data.label); 
    
        response.data.label = parsedLabel;
        
        return response;
    })
    .catch((err) => console.log(err));
}
// export async function getImageById (id) {
//     return axios.get(`${baseUrl}files/${id}/`, {
//         headers: {
//             accept: 'application/json',
//         }
//     })
//     .then((response) => {
//         console.log(response)
//         return response
//     })
//     .catch((err) => console.log(err));
// }
