import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import "./MovieSearch.css";

const API_KEY = "d0bc1146";

const MovieSearch = ({ addToFavorites }) => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [clickedMovie, setClickedMovie] = useState(null);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        if (query.trim() === "") {
            setError("Please enter a movie name.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
                setError("");
            } else {
                setMovies([]);
                setError("No movies found!");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.", error);
        }
        setLoading(false);
    };

    const handleFavoriteClick = (movie) => {
        setClickedMovie(movie.imdbID);
        addToFavorites(movie);

        setTimeout(() => {
            navigate("/favorites");
        }, 1000);
    };

    return (
        <div className="movie-search">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-button" onClick={fetchMovies}>Submit</button>
            </div>
            <p>{loading ? "Loading.." : null}
            </p>
            {loading && <div className="loading-spinner"></div>}
            {error && <p className="error-message">{error}</p>}

            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <img src={movie.Poster !== "N/A" ? movie.Poster : "no-image.jpg"} alt={movie.Title} />
                        <div className="movie-info">
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                            <button className={`favorite-button ${clickedMovie === movie.imdbID ? "clicked" : ""}`}
                                onClick={() => handleFavoriteClick(movie)}
                            >
                                <Star className="favorite-icon" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
