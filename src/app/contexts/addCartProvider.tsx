import { createContext, useEffect, useState } from "react";
import { CartItem } from "@/app/types/products";

interface ContextType {
  addCart: (item: CartItem) => void;
  removeCart: (updatedItem: CartItem) => void;
  addValue: (value: number) => void;
  removeValue: (value: number) => void;
  restaureValue: (value: number, price: number) => void;

  cart: CartItem[];
  resetComponent: boolean;
  value: number;
}

export const AddCartContext = createContext<ContextType | null>(null);

interface Props extends React.PropsWithChildren {}

export default function AddCartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);

  //state para resetar o componente
  const [resetComponent, setResetComponent] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  //use effect para pegar os valores do local storage já existentes
  useEffect(() => {
  
      const productsString = localStorage.getItem("cart");
      const products = productsString ? JSON.parse(productsString) : [];

      setCart(products);

  }, []);

  //adicionar produto ao carrinho
  const addCart = (newItem: CartItem) => {
   
      const isDuplicate = cart.some((item) => item.id === newItem.id);

      if (!isDuplicate) {
        const updatedCart = [...cart, newItem];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setResetComponent(true);

        setTimeout(() => {
          setResetComponent(false);
        }, 1000);
      } else {
        alert("Este item já está no carrinho.");
      }
    
  };

  //remover produto do carrinho
  const removeCart = (itemToRemove: CartItem) => {

      const updatedCart = cart.filter(
        (item) => item.name !== itemToRemove.name
      );

      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setResetComponent(true);

      setTimeout(() => {
        setResetComponent(false);
      }, 1000);
    
  };

  //adicionar valor de acordo com a quantidade
  const addValue = (value: number) => {
    setValue((prev) => prev + value);

    setResetComponent(true);

    setTimeout(() => {
      setResetComponent(false);
    }, 1000);
  };

  //remover valor de acordo com a quantidade
  const removeValue = (value: number) => {
    setValue((prev) => prev - value);

    setResetComponent(true);

    setTimeout(() => {
      setResetComponent(false);
    }, 1000);
  };

  //tirar o valor quando o produto for removido
  const restaureValue = (value: number, price: number) => {
    if (value <= 0) {
      setValue(0);
    } else {
      setValue((prev) => prev - (value - price));
    }

    setResetComponent(true);

    setTimeout(() => {
      setResetComponent(false);
    }, 1000);
  };

  return (
    <AddCartContext.Provider
      value={{
        addCart,
        cart,
        resetComponent,
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
