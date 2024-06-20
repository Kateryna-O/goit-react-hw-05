import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMovieDetail } from "../../api/film-api.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (error) {
    return <ErrorMessage />;
  }

  if (loading || !movie) {
    return <Loader />;
  }

  return (
    <div className={style.wraper}>
      <Link to={backLinkRef.current} className={style.overview}>
        Go back
      </Link>
      <div className={style.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={style.poster}
        />
        <div className={style.details}>
          <h2 className={style.title}>{movie.title}</h2>
          <p className={style.overview}>{movie.overview}</p>
          <p className={style.releaseDate}>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <div className={style.genres}>
            <strong>Genres:</strong>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={style.genre}>
                {genre.name}
              </span>
            ))}
          </div>
          <p className={style.voteAverage}>
            <strong>Rating:</strong> {movie.vote_average} (based on{" "}
            {movie.vote_count} votes)
          </p>
        </div>
      </div>
      <div className={style.additionalInfo}>
        <p>Additional information:</p>
        <nav>
          <Link to={`cast`}>Cast</Link>
          <Link to={`reviews`}>Reviews</Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
