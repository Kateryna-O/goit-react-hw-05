import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { getMovieReviews } from "../../api/film-api.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieReviews.module.css";
export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const reviewsRef = useRef();

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length > 0 && reviewsRef.current) {
      window.scrollTo({
        top: window.scrollY + 200,
        behavior: "smooth",
      });
    }
  }, [reviews]);

  return (
    <div className={css.container}>
      <h2 className={css.h}>MovieReviews</h2>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!error && reviews.length > 0 ? (
        <ul className={css.list} ref={reviewsRef}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.text}>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        !error && (
          <p className={css.textMessage}>
            We don`t have any reviews for this movie yet ... 🙁
          </p>
        )
      )}
    </div>
  );
}
