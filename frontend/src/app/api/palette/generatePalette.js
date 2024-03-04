// export const generatePalette = (fn, colors) => {
//     const url = "http://colormind.io/api/";
//     const data = {
//       model: "default",
//       input: colors?.length === 0 ? undefined : colors.map(i => i.isLocked ? i.rgb : "N")
//     };

    
//     const http = new XMLHttpRequest();
  
//     http.onreadystatechange = function () {
//       if (http.readyState === 4 && http.status === 200) {
//         const result = JSON.parse(http.responseText).result;
//         console.log(result);
//         const palette = result.map((i, idx) => {
//             return {
//                 rgb: colors[idx]?.isLocked ? colors[idx]?.rgb : i, 
//                 isLocked: colors[idx]?.isLocked ?? false
//             }
//         })

//         console.log(palette);
//         fn(palette);
//       }
//     };
  
//     http.open("POST", url, true);
//     http.send(JSON.stringify(data));
//   };

import axios from "axios";
import { baseUrl } from "../../constants";

export async function generatePalette(fn, colors) {
    const apiUrl = `${baseUrl}generate-palette/`;
    try {
      const response = await axios.post(apiUrl, 
        {
          input: colors.map((color) => (color.isLocked ? color.rgb : "N")),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.status === 200) {
        const data = response.data;
        const palette = data.palette;
        console.log(palette);
        fn(palette);
      } else {
        console.error('Failed to fetch palette');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
}