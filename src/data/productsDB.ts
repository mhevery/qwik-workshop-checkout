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
    description: "Red lightsaber like the one that Darth Vadar used.",
    image: "/products/red.png",
    price: 99,
  },
  {
    id: "red-clone",
    name: "Imitation Red lightsaber",
    description: "Red lightsaber clone. ",
    image: "/products/red.png",
    price: 9.95,
  },
  {
    id: "green",
    name: "Green lightsaber",
    description: "Green lightsaber like the one Luke Skywalker used.",
    image: "/products/green.png",
    price: 99,
  },
  {
    id: "purple",
    name: "Purple lightsaber",
    description: "Purple lightsaber like the one that Mace Windu used.",
    image: "/products/purple.png",
    price: 99,
  },
];
