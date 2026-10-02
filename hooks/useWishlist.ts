import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Types derived from your API response
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
  sold: number;
  images: string[];
  imageCover: string;
  ratingsQuantity: number;
  ratingsAverage: number;
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse<T = Product[]> {
  status: string;
  count: number;
  data: T;
}

interface UseWishlistOptions {
  enabled?: boolean;
}

export function useWishlist(options?: UseWishlistOptions) {
  return useQuery<ApiResponse>({
    queryKey: ["getwish"],
    queryFn: async (): Promise<ApiResponse> => {
      const response = await fetch("/api/wishlist");

      if (!response.ok) {
        throw new Error("Something went wrong...");
      }

      return response.json();
    },
    enabled: options?.enabled ?? true,
  });
}