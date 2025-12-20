import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">Movie Explorer</Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                    <button onClick={toggleTheme} className="theme-toggle">
                        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
