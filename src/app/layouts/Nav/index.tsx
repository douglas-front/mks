"use client";
import styles from "./styles.module.scss";
import { TiShoppingCart } from "react-icons/ti";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { OpenCartContext } from "@/app/contexts/openCartProvider";

const AnimationHeader = {
  initial: {
    y: -100,
    borderRadius: "0  0 150% 150%",
  },
  animate: {
    y: 0,
    borderRadius: 0,
    transition: {
      type: "spring",
      stiffness: 32,
    },
  },
};

const Nav = () => {

  //pegando a qunatidade de items no carrinho
  const productsString = localStorage.getItem("cart");
  const products = productsString ? JSON.parse(productsString) : null;

  //contexto para abrir o carrinho
  const context = useContext(OpenCartContext) ?? { openCart: () => {} };
  const { openCart } = context;

  return (
    <motion.header
      className={styles.header}
      variants={AnimationHeader}
      initial="initial"
      animate="animate"
    >
      <nav className={styles.nav}>
        <div className={styles.text}>
          <h1>MKS</h1>
          <p>Sistemas</p>
        </div>
        <div className={styles.cart}>
          <button onClick={openCart} title="clique para abrir o carrinho">
            <TiShoppingCart />
            {products?.length}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Nav;
