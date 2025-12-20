/*eslint-disable react/prop-types*/
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.imdbID);

    const toggleFavorite = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-poster-wrapper">
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            </div>
            <div className="movie-info">
                <Link to={`/movie/${movie.imdbID}`} className="movie-title-link">
                    <h3>{movie.Title}</h3>
                </Link>
                <div className="movie-meta">
                    <span>{movie.Year}</span>
                    <button
                        className={`favorite-btn ${favorite ? 'active' : ''}`}
                        onClick={toggleFavorite}
                        title={favorite ? "Remove from Favorites" : "Add to Favorites"}
                    >
                        {favorite ? '★' : '☆'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
