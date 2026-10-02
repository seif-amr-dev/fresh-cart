export default interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Category[];
}