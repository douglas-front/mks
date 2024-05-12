"use client"
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonClose from "@/app/components/ButtonClose";
import ButtonCloseMobile from "@/app/components/ButtonClose/ButtonCloseMobile";
import CartCard from "@/app/components/CartCard";
import { motion } from "framer-motion";
import { OpenCartContext } from "@/app/contexts/openCartProvider";
import { AddCartContext } from "@/app/contexts/addCartProvider";
import { TbGardenCartOff } from "react-icons/tb";
import { CartItem } from "@/app/types/products";
const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const contextCart = useContext(AddCartContext) ?? { resetComponent: false, value: 0 };
  const { resetComponent, value } = contextCart;

  const context = useContext(OpenCartContext) ?? { open: false, openCart: () => {} };
  const { open, openCart } = context;

  useEffect(() => {
    const productsString = localStorage.getItem("cart");
    const products = productsString ? JSON.parse(productsString) : [];
    setCart(products);
  }, [resetComponent]);

  useEffect(() => {
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total + value);
  }, [cart, value]);

  return (
    <motion.section className={styles.cart} animate={{ x: open ? "-50vw" : "50vw" }} transition={{type:"spring", stiffness: 30}}>
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
          restoure={() => {return}}
        />
        <ButtonCloseMobile
          func={openCart}
          background="#000"
          fontSize="8.45vw"
          title="clique para fechar o carrinho"
          color="#0F52BA"
          restoure={() => {return}}
        />
      </div>

      <div className={styles.cards}>
        {cart.length === 0 ? (
          <div className={styles.cartAny}>
            <h1>carrinho vazio <TbGardenCartOff /></h1>
          </div>
        ) : (
          cart.map((item, index) => (
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
        <button className={styles.btn_order} title="clique para finalizar as compras">
          Finalizar Compra
        </button>
      </div>
    </motion.section>
  );
};

export default Cart;
