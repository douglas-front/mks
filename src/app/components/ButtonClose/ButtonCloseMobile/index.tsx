import { MdClose } from "react-icons/md";
import styles from "../styles.module.scss";
interface Props {
  background: string;
  func: () => void;
  restoure: () => void;
  title: string;
  fontSize: string;
  color: string;
}

const ButtonCloseMobile = ({
  func,
  background,
  title,
  restoure,
  fontSize,
  color,
}: Props) => {
  return (
    <div>
      <button
        className={styles.button_mobile}
        onClick={() => {
          func();
          restoure();
        }}
        title={title}
        style={{ background: background, fontSize: fontSize, color: color }}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default ButtonCloseMobile;
