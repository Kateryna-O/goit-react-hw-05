import { Link, useLocation } from "react-router-dom";
import styles from "./MoviesList.module.css";
const MoViesList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={styles.wraper}>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} state={location}>
            <li className={styles.item}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
              <h4 className={styles.title}>{movie.title}</h4>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MoViesList;
