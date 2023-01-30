export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export const products: Product[] = [
  {
    id: "red",
    name: "Red lightsaber",
    description: "Red lightsaber.",
    image: "/products/red.png",
    price: 99,
  },
  {
    id: "red-clone",
    name: "Imitation Red lightsaber",
    description: "Red lightsaber clone.",
    image: "/products/red.png",
    price: 9.95,
  },
];
