import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page container">
            <h1 className="page-title">My Favorites</h1>
            {favorites.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't added any movies to your favorites yet.</p>
                </div>
            ) : (
                <div className="movie-grid">
                    {favorites.map(movie => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
