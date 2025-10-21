

import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext';
function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()

    const favorite = isFavorite(movie.imdbID)

    function onFavouriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.imdbID)
        else addToFavorites(movie)
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                    alt={movie.Title}
                />

                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavouriteClick}>♥ </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.Title}</h3>  {/* Use Title, not title */}
                <p>{movie.Released}</p>     {/* Use Year, not release_date */}
            </div>

        </div>
    )
}
export default MovieCard;
