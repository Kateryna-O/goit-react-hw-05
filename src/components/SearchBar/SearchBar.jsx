import style from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements[0].value.trim();
    if (inputValue === "") {
      toast.error("This didn't work. Enter a request", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#feffd2",
          color: "#ffaa50",
          fontSize: "20px",
        },
      });
      return;
    }
    onSearch(inputValue);
  };

  return (
    <div className={style.wraper}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          className={style.input}
        />
        <button type="submit" className={style.btn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
