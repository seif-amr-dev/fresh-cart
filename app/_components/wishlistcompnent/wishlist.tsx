"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconTrash,
  IconAlertTriangle,
  IconX,
} from "@tabler/icons-react";
import { RemoveFromWishlist } from "@/Services/api/apiServices";
import { useWishlist, type Product } from "@/hooks/useWishlist";
import Btn from "@/app/_components/Addbtn/Btn";

export default function WishlistComp() {
  const [itemToRemove, setItemToRemove] = useState<Product | null>(null);

  const { data: wishdata, isLoading, isError } = useWishlist();

  const queryClient = useQueryClient();

  const { mutate: removeitem, isPending: isRemoving } = useMutation({
    mutationKey: ["removeWishlistItem"],
    mutationFn: (vars: { productId: string }) =>
      RemoveFromWishlist(vars.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getwish"] });
      setItemToRemove(null);
    },
    onError: (error) => {
      console.error("remove from wishlist failed:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (isError || !wishdata) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-gray-500">Something went wrong...</p>
      </div>
    );
  }

  const items = wishdata.data;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-3">
        <IconHeart size={40} className="text-gray-300" />
        <p className="text-gray-500 font-medium">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center">
            <IconHeart size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        </div>
        <p className="text-gray-500 mb-6">
          You have{" "}
          <span className="font-semibold text-gray-800">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>{" "}
          saved
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((product) => {
            const inStock = product.quantity > 0;

            return (
              <div
                key={product._id}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative bg-primary-50/60 h-52 flex items-center justify-center overflow-hidden">
                  {/* Passive "saved" badge — not clickable */}
                  <span className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                    <IconHeartFilled size={16} className="text-red-500" />
                  </span>

                  {!inStock && (
                    <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}

                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={180}
                    height={180}
                    className="object-contain h-[80%] w-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                      {product.category?.name ?? "General"}
                    </p>

                    <button
                      onClick={() => setItemToRemove(product)}
                      className="w-8 h-8 shrink-0 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>

                  <h3 className="font-semibold text-gray-900 mt-2 line-clamp-2 leading-snug min-h-[2.5rem]">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">
                    <IconStar size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.ratingsAverage ?? 0}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({product.ratingsQuantity ?? 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="font-bold text-gray-900 text-lg">
                      {product.price} <span className="text-sm font-normal text-gray-400">EGP</span>
                    </span>

                    {inStock ? (
                      <Btn isdetails={false} productid={product._id} />
                    ) : (
                      <button
                        disabled
                        className="w-9 h-9 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed"
                      >
                        <IconHeartFilled size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Remove confirmation modal */}
      {itemToRemove && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4"
          onClick={() => !isRemoving && setItemToRemove(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setItemToRemove(null)}
              disabled={isRemoving}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>

            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <IconAlertTriangle size={22} className="text-red-500" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">Remove from wishlist?</h3>
            <p className="text-sm text-gray-500 mt-1">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-700">
                {itemToRemove.title}
              </span>{" "}
              from your wishlist?
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setItemToRemove(null)}
                disabled={isRemoving}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={() => removeitem({ productId: itemToRemove._id })}
                disabled={isRemoving}
                className="flex-1 h-11 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isRemoving ? (
                  <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <IconTrash size={16} />
                )}
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}