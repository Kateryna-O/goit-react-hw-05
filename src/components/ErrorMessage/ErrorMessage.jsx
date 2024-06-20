import style from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.icon}>&#9888;</div>
      <div className={style.h2}>
        <h2>Oops what went wrong...</h2>
      </div>
    </div>
  );
};

export default ErrorMessage;
