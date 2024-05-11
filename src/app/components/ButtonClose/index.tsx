import { MdClose } from "react-icons/md";
import styles from "./styles.module.scss";
interface Props {
  padding: string;
  func: () => void;
  restoure: () => void;
  title: string;
  fontSize: string;
}

const ButtonClose = ({ func, padding, title, restoure, fontSize }: Props) => {
  return (
    <div>
      <button
        className={styles.button_desktop}
        onClick={() => {
          func();
          restoure();
        }}
        title={title}
        style={{ padding: padding, fontSize: fontSize }}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default ButtonClose;
