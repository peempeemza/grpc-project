export interface ProductById {
  product_id: number;
}
export interface Product {
  product_id: number,
  product_code: string,
  product_name: string,
  product_price: number,
}

export interface QueryProduct {
  query: string,
}

export interface Products {
  products: Product[],
}

export class ProductList {
  products: Product[]
}
