import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import Favorites from "./components/Favorites";
import { House, Star } from "lucide-react";
import "./index.css";

const App = () => {
  const addToFavorites = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((fav) => fav.imdbID === movie.imdbID)) {
      const updatedFavorites = [...storedFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            <h2>MovieBase</h2>
          </div>

          <div className="links">
            <Link to="/" ><House /> Home</Link>
            <Link to="/favorites" ><Star /> Favorites</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<MovieSearch addToFavorites={addToFavorites} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;