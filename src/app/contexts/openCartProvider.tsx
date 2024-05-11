"use client";
import { createContext, useState } from "react";

interface ContextType {
  open: boolean;
  openCart: () => void;
}
export const OpenCartContext = createContext<ContextType | null>(null);

interface Props extends React.PropsWithChildren {}

export default function OpenCartProvider({ children }: Props) {
    
  //satet para verificar se o carrinho esta aberto ou fechado
  const [open, setOpen] = useState<boolean>(false);

  //abre ou fecha o carrinho
  const openCart = () => {
    setOpen((prev) => !prev);
  };

  return (
    <OpenCartContext.Provider value={{ openCart, open }}>
      {children}
    </OpenCartContext.Provider>
  );
}
