import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, searchMovies } from '../services/api';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const loadPopularMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPopularMovies();
            setMovies(data);
        } catch (err) {
            setError(err.message);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        if (!query) {
            loadPopularMovies();
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await searchMovies(query);
            setMovies(data);
        } catch (err) {
            setError(err.message);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page container">
            <div className="hero-section">
                <h1>Discover Movies</h1>
                <SearchBar onSearch={handleSearch} />
            </div>

            {loading && <div className="loading">Loading movies...</div>}

            {error && (
                <div className="error-message">
                    <p>⚠️ {error}</p>
                    {error.includes("API Key") && (
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            Please add your free OMDb API key to the <code>.env</code> file.
                        </p>
                    )}
                </div>
            )}

            {!loading && !error && (
                <div className="movie-grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))
                    ) : (
                        <p className="no-movies">No movies found. Try searching for something else!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
