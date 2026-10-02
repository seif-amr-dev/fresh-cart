"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IconShoppingCart,
  IconMinus,
  IconPlus,
  IconTrash,
  IconTruck,
  IconTag,
  IconLock,
  IconShieldCheck,
  IconAlertTriangle,
  IconX,
} from "@tabler/icons-react";
import { ClearCart, DecreaseCart, DeleteProduct, UpdateCart } from "@/Services/api/apiServices";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    category?: { name: string };
  };
}

export default function CartComp() {
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const { data: cartdata, isLoading, isError } = useCart();

  const queryClient = useQueryClient();

  const { mutate: plusitem } = useMutation({
    mutationKey: ["increaseCount"],
    mutationFn: (vars: { productId: string; currentCount: number }) =>
      UpdateCart(vars.productId, vars.currentCount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getcart"] });
    },
    onError: (error) => {
      console.error("mutation failed:", error);
    },
  });

  const { mutate: minusitem } = useMutation({
    mutationKey: ["decreaseCount"],
    mutationFn: (vars: { productId: string; currentCount: number }) =>
      DecreaseCart(vars.productId, vars.currentCount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getcart"] });
    },
    onError: (error) => {
      console.error("mutation failed:", error);
    },
  });

  const { mutate: deleteitem, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: (vars: { productId: string }) => DeleteProduct(vars.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getcart"] });
      setItemToDelete(null);
    },
    onError: (error) => {
      console.error("delete failed:", error);
    },
  });

  const { mutate: deletecart, isPending: isClearing } = useMutation({
    mutationKey: ["clearcart"],
    mutationFn: ClearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getcart"] });
      setConfirmClearOpen(false);
    },
    onError: (error) => {
      console.error("clear cart failed:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (isError || !cartdata) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-gray-500">Something went wrong...</p>
      </div>
    );
  }

  const { data: cart, numOfCartItems } = cartdata;
  const items = cart.products as CartItem[];

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-3">
        <IconShoppingCart size={40} className="text-gray-300" />
        <p className="text-gray-500 font-medium">Your cart is empty.</p>
      </div>
    );
  }

  const qualifiesForFreeShipping = cart.totalCartPrice > 500;


  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center">
            <IconShoppingCart size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 mb-6">
          You have <span className="font-semibold text-gray-800">{numOfCartItems} items</span> in
          your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Items */}
          <div className="lg:col-span-2 xl:col-span-1 space-y-4">
            {items.map((item) => {
              const inStock = item.product.quantity > 0;
              const sku = item.product._id.slice(-6).toUpperCase();
              const itemTotal = item.price * item.count;

              return (
                <div
                  key={item._id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex gap-4"
                >
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="object-contain h-full w-auto"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.product.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                            {item.product.category?.name ?? "General"}
                          </span>
                          <span className="text-xs text-gray-400">
                            SKU: {sku}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setItemToDelete(item)}
                        className="w-9 h-9 shrink-0 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                        aria-label="Remove item"
                      >
                        <IconTrash size={16} />
                      </button>
                    </div>

                    <p className="mt-2">
                      <span className="text-primary-600 font-bold">
                        {item.price} EGP
                      </span>{" "}
                      <span className="text-gray-400 text-sm">per unit</span>
                    </p>

                    {inStock ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full mt-2">
                        ✓ In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full mt-2">
                        Out of Stock
                      </span>
                    )}

                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-full h-9">
                        <button
                          onClick={() => {
                            minusitem({ productId: item.product._id, currentCount: item.count });
                          }}
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-full transition-colors"
                        >
                          <IconMinus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-gray-800">
                          {item.count}
                        </span>
                        <button
                          onClick={() => {
                            plusitem({ productId: item.product._id, currentCount: item.count });
                          }}
                          className="w-8 h-full flex items-center justify-center text-white bg-primary-600 rounded-r-full hover:brightness-110 transition-all"
                        >
                          <IconPlus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">Total</p>
                        <p className="font-bold text-gray-900">
                          {itemTotal} <span className="text-sm font-normal">EGP</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end">
              <button
                onClick={() => setConfirmClearOpen(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
              >
                <IconTrash size={14} />
                Clear cart items
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-primary-600 px-5 py-5 text-white">
                <div className="flex items-center gap-2">
                  <IconShoppingCart size={18} />
                  <h2 className="font-bold text-lg">Order Summary</h2>
                </div>
                <p className="text-sm text-white/80 mt-0.5">
                  {numOfCartItems} items in your cart
                </p>
              </div>

              <div className="p-5">
                {qualifiesForFreeShipping && (
                  <div className="flex items-center gap-3 bg-primary-50 rounded-xl px-4 py-3 mb-5">
                    <IconTruck size={20} className="text-primary-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-primary-700">
                        Free Shipping!
                      </p>
                      <p className="text-xs text-primary-600">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>
                )}

               
               
               
               
                {!qualifiesForFreeShipping&&(


   <div className="flex items-center gap-3 bg-primary-50 rounded-xl px-4 py-3 mb-5">
                    <IconTruck size={20} className="text-primary-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-primary-700">
                        you need {(500-cart.totalCartPrice).toFixed(2)} to qualify for free shipping
                      </p>
                      
                    </div>
                  </div>


                )}












                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-800">
                      {cart.totalCartPrice.toLocaleString()} EGP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span
                      className={`font-semibold ${
                        qualifiesForFreeShipping ? "text-primary-600" : "text-gray-800"
                      }`}
                    >
                      {qualifiesForFreeShipping ? "FREE" : "50 EGP"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-extrabold text-xl text-gray-900">
                    {(
                      cart.totalCartPrice + (qualifiesForFreeShipping ? 0 : 50)
                    ).toLocaleString()}{" "}
                    <span className="text-sm font-semibold text-gray-400">EGP</span>
                  </span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 mt-5 h-11 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                  <IconTag size={16} />
                  Apply Promo Code
                </button>

              <Link href={`/checkout/${cartdata.cartId}`}>

                      <button
                 className="w-full flex items-center justify-center gap-2 mt-3 h-12 rounded-xl bg-primary-600 text-white font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary-600/25">
                  <IconLock size={16} />
                  Secure Checkout
                </button>


              </Link>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <IconShieldCheck size={14} />
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <IconTruck size={14} />
                    Fast Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete single item confirmation modal */}
      {itemToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4"
          onClick={() => !isDeleting && setItemToDelete(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setItemToDelete(null)}
              disabled={isDeleting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>

            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <IconAlertTriangle size={22} className="text-red-500" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">Remove item?</h3>
            <p className="text-sm text-gray-500 mt-1">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-700">
                {itemToDelete.product.title}
              </span>{" "}
              from your cart? This can&apos;t be undone.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setItemToDelete(null)}
                disabled={isDeleting}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteitem({ productId: itemToDelete.product._id })
                }
                disabled={isDeleting}
                className="flex-1 h-11 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <IconTrash size={16} />
                )}
                {isDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear entire cart confirmation modal */}
      {confirmClearOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4"
          onClick={() => !isClearing && setConfirmClearOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setConfirmClearOpen(false)}
              disabled={isClearing}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>

            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <IconAlertTriangle size={22} className="text-red-500" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">Clear your cart?</h3>
            <p className="text-sm text-gray-500 mt-1">
              This will remove all{" "}
              <span className="font-semibold text-gray-700">
                {numOfCartItems} items
              </span>{" "}
              from your cart. This can&apos;t be undone.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setConfirmClearOpen(false)}
                disabled={isClearing}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={() => deletecart()}
                disabled={isClearing}
                className="flex-1 h-11 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isClearing ? (
                  <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <IconTrash size={16} />
                )}
                {isClearing ? "Clearing..." : "Clear Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}