interface CartCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CartSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface CartBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CartProduct {
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  subcategory: CartSubcategory[];
  category: CartCategory;
  brand: CartBrand;
  ratingsAverage: number;
  id: string;
}

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}