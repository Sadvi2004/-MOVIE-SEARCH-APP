import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import "./Favorites.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (imdbID) => {
        const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-page">
            <h2>Favorite Movies</h2>
            <div className="fav-header">
                <Link to="/" className="back-link">
                    <ArrowLeft size={24} /> Back to Home
                </Link>
            </div>

            <div className="movie-list">
                {favorites.length === 0 ? <p>No favorites yet.</p> : (
                    favorites.map((movie) => (
                        <div key={movie.imdbID} className="movie-card">
                            <img src={movie.Poster} alt={movie.Title} />
                            <div className="movie-info">
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                                <button className="remove-btn" onClick={() => removeFavorite(movie.imdbID)}><X /> Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;
