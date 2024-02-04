import axios from 'axios'
import { baseUrl } from '../../constants';
export async function findSignificantColors (formData) {
    return await axios.post(`${baseUrl}files/find_significant_colors`, formData, {
            headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
    })
    .then(async (response) => {
        console.log(response)
        // const parsedLabel = await JSON.parse(response.data.label); 
    
        // response.data.label = parsedLabel;
        
        // return response;
    })
    .catch((err) => console.log(err));
}