"use client";
import {
  CreateCashOrder,
CreateOnlineOrder  ,
} from "@/Services/api/apiServices";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiCreditCard,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiInfo,
  FiCheckCircle,
  FiChevronLeft,
  FiLock,
  FiDollarSign,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation';


type PaymentMethod = "cash" | "online";

interface CartItem {
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
}

interface CartData {
  data: {
    products: CartItem[];
    totalCartPrice: number;
    cartOwner?: string;
    numOfCartItems?: number;
  };
}

export default function CheckOutForm({ cartid }: { cartid: string }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const SHIPPING_COST = 50;
  const router=useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<shippingData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setCartData(data);
        }
      } catch (e) {
        console.error("Failed to fetch cart", e);
      }
    }
    fetchCart();
  }, []);
  

  async function sendOrderData(values: shippingData) {
    setIsLoading(true);
    try {
      if (paymentMethod === "cash") {
        const res = await CreateCashOrder(cartid, values);
        if (res.status === "success") {
          toast.success("Order placed successfully! 🎉");
                    router.push("/allorders")

        }
      } else {
        const res = await CreateOnlineOrder(cartid, values);
        if (res.status === "success" && res.session?.url) {
          window.location.href = res.session.url;
        } else {
          toast.error(
            "Online payment is not available for this account. Please use Cash on Delivery."
          );
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  const products = cartData?.data?.products ?? [];
  const subtotal = cartData?.data?.totalCartPrice ?? 0;
  const total = subtotal + SHIPPING_COST;
  const itemCount = cartData?.data?.numOfCartItems ?? products.length;

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/cart"
            className="hover:text-primary-600 transition-colors"
          >
            Cart
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Checkout</span>
        </nav>

        {/* Title Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <FiShoppingBag className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-0.5">
                Review your items and complete your purchase
              </p>
            </div>
          </div>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors text-sm"
          >
            <FiChevronLeft size={18} />
            Back to Cart
          </Link>
        </div>

        {/* Two-column layout */}
        <form
          onSubmit={handleSubmit(sendOrderData)}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Shipping Address */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-primary-600 px-6 py-4 flex items-center gap-3">
                <FiMapPin className="text-white" size={20} />
                <div>
                  <h2 className="text-white font-semibold text-lg">
                    Shipping Address
                  </h2>
                  <p className="text-primary-100 text-sm">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>
              <div className="bg-white px-6 pt-5 pb-6 flex flex-col gap-5">
                {/* Info Banner */}
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <FiInfo className="text-blue-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <p className="text-blue-700 font-medium text-sm">
                      Delivery Information
                    </p>
                    <p className="text-blue-500 text-xs mt-0.5">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="city"
                    className="text-sm font-semibold text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      {...register("city", { required: "City is required" })}
                      id="city"
                      type="text"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city.message}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="details"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMapPin
                      className="absolute left-3 top-4 text-gray-400"
                      size={16}
                    />
                    <textarea
                      {...register("details", {
                        required: "Street address is required",
                      })}
                      id="details"
                      rows={3}
                      placeholder="Street name, building number, floor, apartment..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition resize-none"
                    />
                  </div>
                  {errors.details && (
                    <p className="text-red-500 text-xs">
                      {errors.details.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^01[0-9]{9}$/,
                          message:
                            "Enter a valid Egyptian number (e.g. 01xxxxxxxxx)",
                        },
                      })}
                      id="phone"
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className="w-full pl-10 pr-36 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      Egyptian numbers only
                    </span>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-primary-600 px-6 py-4 flex items-center gap-3">
                <FiCreditCard className="text-white" size={20} />
                <div>
                  <h2 className="text-white font-semibold text-lg">
                    Payment Method
                  </h2>
                  <p className="text-primary-100 text-sm">
                    Choose how you&apos;d like to pay
                  </p>
                </div>
              </div>
              <div className="bg-white px-6 pt-5 pb-6 flex flex-col gap-4">
                {/* Cash on Delivery */}
                <label
                  htmlFor="pay-cash"
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      paymentMethod === "cash" ? "bg-primary-600" : "bg-gray-100"
                    }`}
                  >
                    <FiDollarSign
                      size={20}
                      className={
                        paymentMethod === "cash" ? "text-white" : "text-gray-500"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${paymentMethod === "cash" ? "text-gray-900" : "text-gray-700"}`}
                    >
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-gray-500">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      paymentMethod === "cash"
                        ? "border-primary-600 bg-primary-600"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cash" && (
                      <FiCheckCircle size={14} className="text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    id="pay-cash"
                    className="sr-only"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                </label>

                {/* Pay Online */}
                <label
                  htmlFor="pay-online"
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "online"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      paymentMethod === "online"
                        ? "bg-primary-600"
                        : "bg-gray-100"
                    }`}
                  >
                    <FiCreditCard
                      size={20}
                      className={
                        paymentMethod === "online"
                          ? "text-white"
                          : "text-gray-500"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${paymentMethod === "online" ? "text-gray-900" : "text-gray-700"}`}
                    >
                      Pay Online
                    </p>
                    <p className="text-sm text-gray-500">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        VISA
                      </span>
                      <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        MC
                      </span>
                      <span className="bg-blue-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        AMEX
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      paymentMethod === "online"
                        ? "border-primary-600 bg-primary-600"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "online" && (
                      <FiCheckCircle size={14} className="text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    id="pay-online"
                    className="sr-only"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                </label>

                {/* Security badge */}
                <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                  <FiShield className="text-primary-600 shrink-0" size={18} />
                  <div>
                    <p className="text-primary-700 font-medium text-sm">
                      Secure &amp; Encrypted
                    </p>
                    <p className="text-primary-500 text-xs mt-0.5">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: <FiTruck size={22} />,
                  title: "Free Shipping",
                  sub: "On orders over 500 EGP",
                },
                {
                  icon: <FiRefreshCw size={22} />,
                  title: "Easy Returns",
                  sub: "14 day return policy",
                },
                {
                  icon: <FiShield size={22} />,
                  title: "Secure Payment",
                  sub: "100% secure checkout",
                },
                {
                  icon: <FiHeadphones size={22} />,
                  title: "24/7 Support",
                  sub: "Contact us anytime",
                },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center gap-2 shadow-sm"
                >
                  <span className="text-primary-600">{icon}</span>
                  <p className="font-semibold text-sm text-gray-800">{title}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Order Summary ── */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 sticky top-24">
              <div className="bg-primary-600 px-6 py-4 flex items-center gap-3">
                <FiShoppingBag className="text-white" size={20} />
                <div>
                  <h2 className="text-white font-semibold text-lg">
                    Order Summary
                  </h2>
                  <p className="text-primary-100 text-sm">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <div className="bg-white px-6 py-5 flex flex-col gap-4">
                {/* Product list */}
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {products.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                      Loading cart...
                    </p>
                  ) : (
                    products.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 shrink-0">
                          {item.count * item.price}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <hr className="border-gray-100" />

                {/* Price breakdown */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{subtotal} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <FiTruck size={14} className="text-gray-400" />
                      Shipping
                    </span>
                    <span>{SHIPPING_COST} EGP</span>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary-600">
                      {total}
                    </span>
                    <span className="text-sm font-semibold text-gray-500">
                      EGP
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiLock size={16} />
                      Place Order
                    </>
                  )}
                </button>

                {/* Trust badges */}
                <div className="flex justify-center items-center gap-4 pt-1">
                  {[
                    { icon: <FiShield size={12} />, label: "Secure" },
                    { icon: <FiTruck size={12} />, label: "Fast Delivery" },
                    { icon: <FiRefreshCw size={12} />, label: "Easy Returns" },
                  ].map(({ icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1 text-xs text-gray-500"
                    >
                      <span className="text-primary-600">{icon}</span>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export interface shippingData {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}