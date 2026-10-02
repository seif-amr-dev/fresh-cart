export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  imageCover: string;
  images: string[];
  subcategory: Subcategory[];
  category: Category;
  brand: Brand;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Product[];
}


export type BtnProps = {
  isdetails: boolean;
  productid:string
};