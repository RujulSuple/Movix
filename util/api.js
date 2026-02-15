import axios from "axios";

const Base_URL = "https://api.themoviedb.org/3";

export const fetchDataFromApi = async (endpt, query = null) => {
    let url = query ? `${Base_URL}${endpt}?${query}` : `${Base_URL}${endpt}`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
