// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_API_URL
//     : "http://localhost:8000/api/";
const baseUrl = 'https://color-accessibility-c26550ebbc98.herokuapp.com/api/'

const color_dict = {
    0: 'Red',
    1: 'Green',
    2: 'Blue',
    3: 'Yellow',
    4: 'Orange',
    5: 'Pink',
    6: 'Purple',
    7: 'Brown',
    8: 'Grey',
    9: 'Black',
    10: 'White',
};

export { baseUrl, color_dict };
