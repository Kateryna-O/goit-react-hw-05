import { useState } from "react";
import { useEffect } from "react";
import { getTrendingMovies } from "../../api/film-api.js";
import MoviesList from "../../components/MoviesList/MovieList.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {error && <ErrorMessage />}
      {movies.length > 0 && <MoviesList movies={movies} />}
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
