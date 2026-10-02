"use client";

import Image from "next/image";
import { useState } from "react";
import {
  IconHeart,
  IconRepeat,
  IconEye,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";
import Btn from "../Addbtn/Btn";
import { AddtoWishList } from "@/Services/api/apiServices";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const { data, status } = useSession();
    const isAuthenticated = status === "authenticated";


  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  return (
    <div className="group relative bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* discount badge */}
      {hasDiscount && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          -{discountPercent}%
        </span>
      )}

      {/* action icons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={async () => {
  if (!isAuthenticated) {
    toast.error("You need to login first");
    return;
  }

  try {
    await AddtoWishList(product._id);

    setWished(true);

    toast.success("Product added to wishlist");
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Couldn't add product to wishlist"
    );
  }
}}



          
          
          className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
        >
          <IconHeart
            size={16}
            className={wished ? "fill-red-500 text-red-500" : ""}
          />
        </button>
        <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
          <IconRepeat size={16} />
        </button>
        <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
          <IconEye size={16} />
        </button>
      </div>

      {/* clickable area: image + title/category only */}
      <Link href={`/ProductDetails/${product._id}`}>
        {/* image */}
        <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center h-64">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={220}
            height={220}
            className="object-contain h-full w-auto transition-transform duration-500"
          />
        </div>

        <div className="px-4 pt-4">
          <p className="text-xs text-gray-400">
            {product.category?.name ?? "General"}
          </p>
          <h3 className="font-semibold text-gray-800 truncate">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 mt-1">
            <IconStar size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.ratingsAverage ?? 0}
            </span>
            <span className="text-sm text-gray-400">
              ({product.ratingsQuantity ?? 0})
            </span>
          </div>
        </div>
      </Link>

      {/* price + add-to-cart: NOT inside the Link, so clicks never navigate */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-gray-900">
              {hasDiscount ? product.priceAfterDiscount : product.price} EGP
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <Btn isdetails={false} productid={product._id} />
        </div>
      </div>
    </div>
  );
}