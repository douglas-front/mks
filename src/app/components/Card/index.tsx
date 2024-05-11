"use client";

import { useContext } from "react";
import { AddCartContext } from "@/app/contexts/addCartProvider";
import { BsFillBagFill } from "react-icons/bs";
import styles from "./styles.module.scss";

interface Props {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
}

const Card = ({ description, name, photo, price, id }: Props) => {
  //quantidade base
  const quantity = 1;

  //contexto do carrinho
  const context = useContext(AddCartContext) ?? { addCart: () => {} };
  const { addCart } = context;

  return (
    <div className={styles.card}>
      <img src={photo} alt={name} />
      <div className={styles.text}>
        <h1>{name}</h1>
        <div className={styles.price}>R${price}</div>
      </div>
      <div className={styles.paragraph}>
        <p>{description}</p>
      </div>

      <button
        className={styles.order}
        title="adicionar ao carrinho"
        onClick={() => {
          addCart({ name, photo, price, quantity, id });
        }}
      >
        <BsFillBagFill />
        comprar
      </button>
    </div>
  );
};

export default Card;
