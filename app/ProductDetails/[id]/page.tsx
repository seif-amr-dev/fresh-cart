// app/ProductDetails/[id]/page.tsx
"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { GetProduct } from "@/Services/api/apiServices";
import {
  IconHeart,
  IconStar,
  IconStarFilled,
  IconMinus,
  IconPlus,
  IconTruck,
  IconRepeat,
  IconShieldCheck,
  IconFlame,
  IconChevronRight,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import Btn from "@/app/_components/Addbtn/Btn";
import { boolean } from "zod";



interface ProductPageProps {
  params: Promise<{ id: string }>;
}

interface Review {
  _id: string;
  rating: number;
  review: string;
  createdAt: string;
  user: { _id: string; name: string };
}

interface Product {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  imageCover: string;
  images?: string[];
  category?: { name: string; image?: string };
  subcategory?: { name: string }[];
  brand?: { name: string; image?: string };
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price: number;
  priceAfterDiscount?: number;
  quantity?: number;
  sold?: number;
  reviews?: Review[];
}

function parseSpecs(description: string): [string, string][] {
  const lines = description.split("\n").filter(Boolean);
  const specs = lines
    .map((line) => line.split("\t"))
    .filter((parts): parts is [string, string] => parts.length === 2);
  return specs.length === lines.length ? specs : [];
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function ProductDetails({ params }: ProductPageProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [wished, setWished] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    GetProduct(id)
      .then((res) => {
        if (!active) return;
        const data: Product | undefined = res?.data;
        setProduct(data ?? null);
        setActiveImg(data?.imageCover ?? "");
      })
      .catch(() => {
        if (active) setProduct(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const savings = hasDiscount ? product.price - product.priceAfterDiscount! : 0;

  const gallery = [product.imageCover, ...(product.images ?? [])].filter(
    (img, i, arr) => arr.indexOf(img) === i
  );

  const inStock = (product.quantity ?? 1) > 0;
  const lowStock =
    inStock && (product.quantity ?? 0) > 0 && (product.quantity ?? 0) <= 10;

  const specs = parseSpecs(product.description);
  const reviews = product.reviews ?? [];
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count,
      pct: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
    };
  });

  const avg = product.ratingsAverage ?? 0;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <span className="hover:text-primary-600 cursor-pointer transition-colors">
            {product.category?.name ?? "Shop"}
          </span>
          {product.subcategory?.[0]?.name && (
            <>
              <IconChevronRight size={12} />
              <span className="hover:text-primary-600 cursor-pointer transition-colors">
                {product.subcategory[0].name}
              </span>
            </>
          )}
          <IconChevronRight size={12} />
          <span className="text-gray-600 font-medium truncate max-w-[240px]">
            {product.title}
          </span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Gallery */}
            <div>
              <div className="relative bg-primary-50/60 border border-primary-50 rounded-2xl h-[420px] flex items-center justify-center overflow-hidden group">
                {hasDiscount && (
                  <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30">
                    -{discountPercent}% OFF
                  </span>
                )}
                {!!product.sold && (
                  <span className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    <IconFlame size={13} />
                    {product.sold.toLocaleString()} sold
                  </span>
                )}
                <Image
                  src={activeImg}
                  alt={product.title}
                  width={340}
                  height={340}
                  className="object-contain h-[85%] w-auto transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                />
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(img)}
                      className={`w-[72px] h-[72px] rounded-xl border-2 overflow-hidden flex items-center justify-center bg-white transition-all ${
                        activeImg === img
                          ? "border-primary-600 shadow-md shadow-primary-600/20"
                          : "border-gray-100 hover:border-primary-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} ${i + 1}`}
                        width={60}
                        height={60}
                        className="object-contain h-full w-auto"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy box */}
            <div className="lg:sticky lg:top-6 self-start">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {product.category?.name ?? "General"}
                </span>
                {product.brand?.name && (
                  <div className="flex items-center gap-2 bg-white border border-gray-100 pl-1.5 pr-3 py-1 rounded-full">
                    {product.brand.image && (
                      <Image
                        src={product.brand.image}
                        alt={product.brand.name}
                        width={22}
                        height={22}
                        className="rounded-full object-contain bg-white"
                      />
                    )}
                    <span className="text-xs font-semibold text-gray-600">
                      {product.brand.name}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-[26px] leading-tight font-bold text-gray-900 mt-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1 bg-primary-50 px-2.5 py-1 rounded-full">
                  <IconStarFilled size={14} className="text-primary-600" />
                  <span className="text-sm font-bold text-gray-700">
                    {avg.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {(product.ratingsQuantity ?? reviews.length).toLocaleString()}{" "}
                  ratings
                </span>
              </div>

              <div className="mt-5 pb-5 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {hasDiscount ? product.priceAfterDiscount : product.price}
                  </span>
                  <span className="text-lg font-semibold text-gray-400">EGP</span>
                  {hasDiscount && (
                    <span className="text-lg text-gray-400 line-through">
                      {product.price} EGP
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <p className="text-sm font-semibold text-primary-600 mt-1">
                    You save {savings} EGP ({discountPercent}%)
                  </p>
                )}

                <p
                  className={`inline-flex items-center gap-1.5 text-sm mt-3 font-semibold px-2.5 py-1 rounded-full ${
                    !inStock
                      ? "bg-red-50 text-red-500"
                      : "bg-primary-50 text-primary-600"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {!inStock
                    ? "Out of stock"
                    : lowStock
                    ? `Only ${product.quantity} left — order soon`
                    : "In stock"}
                </p>
              </div>

              {/* Quantity + actions */}
              <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center border border-gray-200 rounded-xl h-12">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-primary-50 rounded-l-xl transition-colors"
                  >
                    <IconMinus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-800">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-primary-50 rounded-r-xl transition-colors"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>

            <Btn isdetails={true} productid={product._id} />

                <button
                  onClick={() => setWished((w) => !w)}
                  className={`w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                    wished
                      ? "border-primary-200 bg-primary-50"
                      : "border-gray-200 hover:bg-primary-50"
                  }`}
                >
                  <IconHeart
                    size={19}
                    className={wished ? "fill-primary-600 text-primary-600" : "text-gray-500"}
                  />
                </button>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2.5 bg-primary-50/70 rounded-xl px-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <IconTruck size={16} className="text-primary-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    Free delivery
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-primary-50/70 rounded-xl px-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <IconRepeat size={16} className="text-primary-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    Easy returns
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-primary-50/70 rounded-xl px-3 py-3 col-span-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <IconShieldCheck size={16} className="text-primary-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    Secure checkout & buyer protection
                  </span>
                </div>
              </div>

              {/* Specs */}
              {specs.length > 0 && (
                <div className="mt-7">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                    Product Details
                  </h3>
                  <dl className="rounded-xl overflow-hidden border border-gray-100">
                    {specs.map(([key, value], i) => (
                      <div
                        key={key}
                        className={`flex justify-between px-4 py-3 text-sm ${
                          i % 2 === 0 ? "bg-primary-50/50" : "bg-white"
                        }`}
                      >
                        <dt className="text-gray-400">{key}</dt>
                        <dd className="text-gray-700 font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Customer Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Summary */}
              <div className="md:col-span-1">
                <div className="bg-primary-50/60 rounded-2xl p-5 text-center">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {avg.toFixed(1)}
                  </span>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) =>
                      i <= Math.round(avg) ? (
                        <IconStarFilled key={i} size={16} className="text-primary-600" />
                      ) : (
                        <IconStar key={i} size={16} className="text-gray-300" />
                      )
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {reviews.length} reviews
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {distribution.map(({ star, pct, count }) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-gray-400 font-medium">{star}</span>
                      <IconStarFilled size={10} className="text-primary-600 shrink-0" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-gray-400 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="md:col-span-2 space-y-4">
                {visibleReviews.map((r) => (
                  <div
                    key={r._id}
                    className="border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 text-xs font-bold flex items-center justify-center">
                          {initials(r.user?.name ?? "?")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {r.user?.name ?? "Anonymous"}
                          </p>
                          <div className="flex gap-0.5 mt-0.5">
                            {[1, 2, 3, 4, 5].map((i) =>
                              i <= r.rating ? (
                                <IconStarFilled key={i} size={11} className="text-primary-600" />
                              ) : (
                                <IconStar key={i} size={11} className="text-gray-300" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {r.review}
                    </p>
                  </div>
                ))}

                {reviews.length > 4 && (
                  <button
                    onClick={() => setShowAllReviews((s) => !s)}
                    className="w-full text-center text-sm font-semibold text-primary-600 hover:bg-primary-50 py-3 rounded-xl transition-colors"
                  >
                    {showAllReviews
                      ? "Show less"
                      : `Show all ${reviews.length} reviews`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}