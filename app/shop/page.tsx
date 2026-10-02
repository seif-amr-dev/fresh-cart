"use client";

import { useQuery } from "@tanstack/react-query";
import { IconBox } from "@tabler/icons-react";
import Link from "next/link";
import { GetProducts } from "@/Services/api/apiServices";
import ProductCard from "../_components/productcard/productCard";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category?: { name: string };
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price: number;
  priceAfterDiscount?: number;
}

export default function ShopComp() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: GetProducts,
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">All Products</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <IconBox size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">All Products</h1>
              <p className="text-white/90 mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {isLoading && (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading products...</p>
            </div>
          </div>
        )}

        {isError && (
          <div className="min-h-[40vh] flex items-center justify-center">
            <p className="text-gray-500">Something went wrong...</p>
          </div>
        )}

        {products && (
          <>
            <p className="text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-800">{products.length}</span>{" "}
              products
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}