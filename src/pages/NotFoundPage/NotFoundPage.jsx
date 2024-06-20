import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h3 className={styles.notFoundHeader}>Page Not Found</h3>
      <Link to="/" className={styles.backLink}>
        Back to Home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
