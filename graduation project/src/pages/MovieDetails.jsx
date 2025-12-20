import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const loadMovie = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    if (loading) return <div className="loading container">Loading details...</div>;

    if (error) return (
        <div className="container error-message">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h2>Error</h2>
            <p>{error}</p>
        </div>
    );

    if (!movie) return <div className="container">Movie not found.</div>;

    const favorite = isFavorite(movie.imdbID);

    return (
        <div className="movie-details-page container">
            <Link to="/" className="back-link">← Back to Home</Link>
            <div className="movie-details-card">
                <div className="detail-poster-wrapper">
                    <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} alt={movie.Title} className="detail-poster" />
                </div>
                <div className="detail-info">
                    <h1 className="detail-title">{movie.Title} <span className="detail-year">({movie.Year})</span></h1>
                    <div className="detail-meta">
                        <span className="rating-badge">★ {movie.imdbRating}</span>
                        <span className="genre-badge">{movie.Genre}</span>
                    </div>
                    <div className="plot-section">
                        <h3>Plot</h3>
                        <p className="plot">{movie.Plot}</p>
                    </div>
                    <div className="cast-section">
                        <h3>Cast</h3>
                        <p>{movie.Actors}</p>
                    </div>

                    <button
                        className={`action-btn ${favorite ? 'remove' : 'add'}`}
                        onClick={() => favorite ? removeFavorite(movie.imdbID) : addFavorite(movie)}
                    >
                        {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
