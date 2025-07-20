import axios from "axios";

export function getImagesByQuery(query) {
    
   return axios.get("https://pixabay.com/api/", {
        params: {
            key: '51327583-eda9110ddf8c3e7e62438a086',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true
        }
   })
       .then(res => {
            return res.data;
        })
}