const API_KEY = "1e679bd";

const keywords = [
    "batman",
    "avengers",
    "matrix",
    "harry potter",
    "lord of the rings",
    "spiderman",
    "star wars",
    "joker",
    "inception",
    "pirates",
    "transformers",
    "mission impossible",
    "fast and furious",
    "thor",
    "iron man"
];

export const getPopularMovies = async () => {
    const allMovies = [];
    for (const keyword of keywords) {
        const res = await fetch(`/api/movies?query=${keyword}`);
        const data = await res.json();
        if (data.Response === "True" && Array.isArray(data.Search)) {
            allMovies.push(...data.Search);
        }
    }

    // Remove duplicates
    const seen = new Set();
    const uniqueMovies = allMovies.filter(movie => {
        if (seen.has(movie.imdbID)) return false;
        seen.add(movie.imdbID);
        return true;
    });

    return uniqueMovies;
};
export const searchMovies = async (query) => {
    try {
        const res = await fetch(`/api/movies?query=${query}`);
        const data = await res.json();

        if (data.Response === "True" && Array.isArray(data.Search)) {
            return data.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

