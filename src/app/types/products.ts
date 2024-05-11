//um unico produto
export interface Product {
  brand: string;
  createAt: string;
  description: string;
  id: number;
  name: string;
  photo: string;
  price: string;
  updateAt: string;
}

//array de produto
export interface Products {
  count: number;
  products: Product[];
}

//produto do carrinho
export interface CartItem {
  id: number
  name: string;
  photo: string;
  price: number;
  quantity: number
}
