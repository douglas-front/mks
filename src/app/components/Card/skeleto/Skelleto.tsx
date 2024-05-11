
import styles from "./styles.module.scss";

//array para fazer o map
const array = [1, 2, 3, 4, 5, 6, 7, 8];

const CardSkelleto = () => {
  return (
    <>
      {array.map((number) => (
        <div className={styles.card} key={number}>
          <div className={styles.bg}></div>

          <div className={styles.text}>
            <div></div>

            <div className={styles.price}></div>
          </div>
          <div className={styles.paragraph}></div>
        </div>
      ))}
    </>
  );
};

export default CardSkelleto;
