import { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/film-api.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieCast.module.css";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div className={css.movieCast}>
      <h2 className={css.heading}>Movie Cast</h2>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!error && !loading && cast.length > 0 ? (
        <ul className={css.list} ref={contentRef}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.listItem}>
              <img
                className={css.actorImage}
                src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                alt={name}
                width="250"
              />
              <p className={css.actorName}>{name}</p>
              {character && <p className={css.characterName}>{character}</p>}
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        !error && (
          <p className={css.textMessage}>
            Sorry! We have no information about the cast of this film 🙁
          </p>
        )
      )}
    </div>
  );
};

export default MovieCast;
