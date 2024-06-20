import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import MoviesList from "../../components/MoviesList/MovieList.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../../api/film-api.js";
import { useEffect } from "react";

import css from "./MoviesPage.module.css";
const MoviesPage = () => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovies = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!searchMovies) return;

    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getSearchMovie(searchMovies);
        setFoundMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchMovies]);

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!error && foundMovies.length > 0 && <MoviesList movies={foundMovies} />}
      {!error && !loading && searchMovies && foundMovies.length === 0 && (
        <p className={css.message}>No movies found for this query ... 🙁 </p>
      )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
