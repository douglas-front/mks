"use client";
import { useContext, useEffect, useState } from "react";

import styles from "./styles.module.scss";
import ButtonClose from "@/app/components/ButtonClose";
import ButtonCloseMobile from "@/app/components/ButtonClose/ButtonCloseMobile";
import CartCard from "@/app/components/CartCard";
import { motion } from "framer-motion";
import { OpenCartContext } from "@/app/contexts/openCartProvider";
import { CartItem } from "@/app/types/products";
import { AddCartContext } from "@/app/contexts/addCartProvider";
import { TbGardenCartOff } from "react-icons/tb";

const Cart = () => {
  //states
  const [cart, setCart] = useState<CartItem[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  //local storage
  const productsString = localStorage.getItem("cart");
  const products = productsString ? JSON.parse(productsString) : null;

  //contextos
  const contextCart = useContext(AddCartContext) ?? { verify: false, value: 0 };
  const { verify, value } = contextCart;

  const context = useContext(OpenCartContext) ?? {
    open: false,
    openCart: () => {},
  };
  const { open, openCart } = context;

  //animação
  const animateCart = {
    animate: {
      x: open ? "-50vw" : "50vw",
      transition: {
        type: "spring",
        stiffness: 31,
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    setCart(products);
  }, [verify]);

  useEffect(() => {
    let total = products?.reduce((acc: any, item: any) => acc + item.price, 0);

    setTotalPrice((total += value));
  }, [verify]);

  return (
    <motion.section
      className={styles.cart}
      variants={animateCart}
      animate="animate"
    >
      <div className={styles.up}>
        <h1>carrinho </h1>
        <h1>de compras</h1>
      </div>

      <div className={styles.btn}>
        <ButtonClose
          func={openCart}
          padding="0.8vw"
          fontSize="1.45vw"
          title="clique para fechar o carrinho"
          restoure={() => console.log("po")}
        />
        <ButtonCloseMobile
          func={openCart}
          background="#000"
          fontSize="8.45vw"
          title="clique para fechar o carrinho"
          color="#0F52BA"
          restoure={() => console.log("po")}
        />
      </div>

      <div className={styles.cards}>
        {cart?.length === 0 ? (
          <div className={styles.cartAny}>
            <h1>carrinho vazio <TbGardenCartOff /></h1>
          </div>
        ) : (
          cart?.map((item: CartItem, index) => (
            <CartCard
              name={item.name}
              photo={item.photo}
              price={item.price}
              key={index}
              id={item.id}
            />
          ))
        )}
      </div>
      <div className={styles.push}>
        <div className={styles.total}>
          <h1>Total:</h1>
          <h1>R${totalPrice}</h1>
        </div>
        <button
          className={styles.btn_order}
          title="clique para finalizar as compras"
        >
          Finalizar Compra
        </button>
      </div>
    </motion.section>
  );
};

export default Cart;
