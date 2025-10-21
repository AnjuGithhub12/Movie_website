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
<<<<<<< HEAD
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
=======
    try {
        const promises = keywords.map(async (keyword) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
            const data = await res.json();

            // 🔍 Log what OMDb actually returns
            console.log(`Keyword "${keyword}" →`, data);

            if (data.Response === "True" && Array.isArray(data.Search)) {
                return data.Search;
            } else {
                console.warn(`⚠️ No movies found for "${keyword}": ${data.Error}`);
                return [];
            }
        });

        const results = await Promise.all(promises);
        const mixedMovies = results.flat();

        // 🧩 Remove duplicates
        const uniqueMovies = [];
        const seen = new Set();

        for (const movie of mixedMovies) {
            if (movie?.imdbID && !seen.has(movie.imdbID)) {
                seen.add(movie.imdbID);
                uniqueMovies.push(movie);
            }
        }

        // 🧠 Fetch full details
        const detailedMoviesPromises = uniqueMovies.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
            const detail = await res.json();
            if (detail.Response === "True") return detail;
            return null;
        });

        const detailedMovies = (await Promise.all(detailedMoviesPromises)).filter(Boolean);

        console.log("✅ Final detailed movies:", detailedMovies);
        return detailedMovies;
    } catch (error) {
        console.error("❌ Error fetching detailed movies:", error);
>>>>>>> 80342f04fdab597f988781985857dce5fb678a96
        return [];
    }
};

<<<<<<< HEAD
=======
export const searchMovies = async (query) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        console.log(`Search for "${query}" →`, data);

        if (data.Response === "True" && Array.isArray(data.Search)) {
            return data.Search;
        } else {
            console.warn(`⚠️ No movies found for query "${query}": ${data.Error}`);
            return [];
        }
    } catch (error) {
        console.error("❌ Error searching movies:", error);
        return [];
    }
};
>>>>>>> 80342f04fdab597f988781985857dce5fb678a96
