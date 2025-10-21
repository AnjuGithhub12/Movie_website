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

// Fetch popular movies based on keywords
export const getPopularMovies = async () => {
    try {
        const promises = keywords.map(async (keyword) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
            const data = await res.json();

            if (data.Response === "True" && Array.isArray(data.Search)) {
                return data.Search;
            } else {
                return [];
            }
        });

        const results = await Promise.all(promises);
        const mixedMovies = results.flat();

        // Remove duplicates
        const seen = new Set();
        const uniqueMovies = mixedMovies.filter(movie => {
            if (seen.has(movie.imdbID)) return false;
            seen.add(movie.imdbID);
            return true;
        });

        // Fetch full details for each movie
        const detailedMoviesPromises = uniqueMovies.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
            const detail = await res.json();
            if (detail.Response === "True") return detail;
            return null;
        });

        const detailedMovies = (await Promise.all(detailedMoviesPromises)).filter(Boolean);
        return detailedMovies;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};

// Search movies by user query
export const searchMovies = async (query) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await res.json();

        if (data.Response === "True" && Array.isArray(data.Search)) {
            return data.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};
