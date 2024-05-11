"use client";
import { createContext, useEffect, useState } from "react";
import { CartItem } from "@/app/types/products";

interface ContextType {
  addCart: (item: CartItem) => void;
  removeCart: (updatedItem: CartItem) => void;
  addValue: (value: number) => void;
  removeValue: (value: number) => void;
  restaureValue: (value: number, price: number) => void;

  cart: CartItem[];
  verify: boolean;
  value: number;
}

export const AddCartContext = createContext<ContextType | null>(null);

interface Props extends React.PropsWithChildren {}

export default function AddCartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [verify, setVerify] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  //pega os produtos ja existentes
  useEffect(() => {
    const productsString = localStorage.getItem("cart");
    const products = productsString ? JSON.parse(productsString) : [];

    setCart(products);
  }, []);

  //adiciona produto no local storage
  const addCart = (newItem: CartItem) => {
    const isDuplicate = cart.some((item) => item.id === newItem.id);

    if (!isDuplicate) {
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setVerify(true);

      setTimeout(() => {
        setVerify(false);
      }, 1000);
    } else {
      alert("Este item já está no carrinho.");
    }
  };

  //remove produto do local storage
  const removeCart = (itemToRemove: CartItem) => {
    const updatedCart = cart.filter((item) => item.name !== itemToRemove.name);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setVerify(true);

    setTimeout(() => {
      setVerify(false);
    }, 1000);
  };

  //adiciona preço de acordo com a quantidade
  const addValue = (value: number) => {
    setValue((prev) => prev + value);

    setVerify(true);

    setTimeout(() => {
      setVerify(false);
    }, 1000);
  };

  //remove preço de acordo com a quantidade
  const removeValue = (value: number) => {
    setValue((prev) => prev - value);

    setVerify(true);

    setTimeout(() => {
      setVerify(false);
    }, 1000);
  };
  
  //tirar preço quando o produto é removido
  const restaureValue = (value: number, price: number) => {
    if (value <= 0) {
      setValue(0);
    } else {
      setValue((prev) => prev - (value - price));
    }

    console.log(value);

    setVerify(true);

    setTimeout(() => {
      setVerify(false);
    }, 1000);
  };

  return (
    <AddCartContext.Provider
      value={{
        addCart,
        cart,
        verify,
        removeCart,
        value,
        addValue,
        removeValue,
        restaureValue,
      }}
    >
      {children}
    </AddCartContext.Provider>
  );
}
