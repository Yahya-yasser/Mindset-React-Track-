const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
    try {
        if (!API_KEY) throw new Error("API Key is missing. Please add VITE_API_KEY to .env file.");

        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === "True") {
            return data.Search;
        } else {
            throw new Error(data.Error || "No results found");
        }
    } catch (error) {
        throw error;
    }
};

export const getMovieDetails = async (id) => {
    try {
        if (!API_KEY) throw new Error("API Key is missing");

        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();

        if (data.Response === "True") {
            return data;
        } else {
            throw new Error(data.Error || "Movie details not found");
        }
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const getPopularMovies = async () => {
    // Fallback search to populate home page
    return await searchMovies("Avengers");
};
