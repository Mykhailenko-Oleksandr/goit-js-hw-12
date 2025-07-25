import axios from "axios";

export async function getImagesByQuery(query, page) {

    const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: '51327583-eda9110ddf8c3e7e62438a086',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 15
        }
    })

    return response.data;
}