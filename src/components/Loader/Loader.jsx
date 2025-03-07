import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4b2c20"
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
