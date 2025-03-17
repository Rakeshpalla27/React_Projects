import styles from "./Button.module.css";
function Button({ onclick, type, children }) {
  return (
    <button onClick={onclick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
