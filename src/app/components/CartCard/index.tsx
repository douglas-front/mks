"use client";
import ButtonClose from "@/app/components/ButtonClose";
import styles from "./styles.module.scss";
import { useState, useEffect, useContext } from "react";
import { CartItem } from "@/app/types/products";
import { AddCartContext } from "@/app/contexts/addCartProvider";
import ButtonCloseMobile from "@/app/components/ButtonClose/ButtonCloseMobile";

interface Props {
  id: number;
  photo: string;
  name: string;
  price: number;
}

const CartCard = ({ name, photo, price, id }: Props) => {
  //contexto do carrinho
  const contextCart = useContext(AddCartContext) ?? {
    removeCart: () => {},
    addValue: () => {},
    removeValue: () => {},
    restaureValue: () => {},
    value: 0,
  };
  const { removeCart, addValue, removeValue, restaureValue, value } =
    contextCart;

  //state para guardar a quantidade
  const [quantity, setQuantity] = useState<number>(1);

  //adiciona quantidade
  const addQuantity = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
  };

  //remove quantidade
  const removeQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div className={styles.card}>
      <img src={photo} alt={name} />
      <p>{name}</p>
      <div className={styles.controller_button}>
        <p>Qtd:</p>
        <div className={styles.btn}>
          <div className={styles.border}>
            <button
              title="clique para retirar produto"
              onClick={() => {
                removeQuantity();
                if (quantity > 1) {
                  removeValue(price);
                }
              }}
            >
              -
            </button>
            <div className={styles.line}></div>
            <p>{quantity}</p>
            <div className={styles.line}></div>
            <button
              title="clique para adicionar produto"
              onClick={() => {
                addQuantity();
                addValue(price);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className={styles.totalPrice}>
        <h4>R${price * quantity}</h4>
      </div>

      <div className={styles.btn_remove}>
        <ButtonClose
          padding="0.3vw"
          fontSize="0.72vw"
          title="clique para remover"
          func={() => removeCart({ name, photo, price, quantity, id })}
          restoure={() => restaureValue(price * quantity, price)}
        />
        <ButtonCloseMobile
          func={() => removeCart({ name, photo, price, quantity, id })}
          background="transparent"
          fontSize="8.45vw"
          title="clique para fechar o carrinho"
          color="#000"
          restoure={() => restaureValue(price * quantity, price)}
        />
      </div>
    </div>
  );
};

export default CartCard;
