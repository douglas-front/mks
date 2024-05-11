"use client"
import styles from "./styles.module.scss";
import { TiShoppingCart } from "react-icons/ti";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
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
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const context = useContext(OpenCartContext) ?? { openCart: () => {} };
  const { openCart } = context;

  useEffect(() => {
    const productsString = localStorage.getItem("cart");
    const products = productsString ? JSON.parse(productsString) : [];
    setCartItemsCount(products.length);
  }, []);

  const handleOpenCart = () => {
    openCart();
  };

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
          <button onClick={handleOpenCart} title="Clique para abrir o carrinho">
            <TiShoppingCart />
            {cartItemsCount}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Nav;
