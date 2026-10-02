"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Getuserorders } from "@/Services/api/apiServices";
import {
  FiShoppingBag,
  FiCalendar,
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
  FiPhone,
  FiFileText,
  FiPackage,
  FiCreditCard,
  FiDollarSign,
  FiClock,
  FiTruck,
} from "react-icons/fi";

interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category?: {
    name: string;
  };
  ratingsAverage?: number;
}

interface OrderCartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

interface ShippingAddress {
  details?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
}

interface Order {
  _id: string;
  id: number;
  totalOrderPrice: number;
  taxPrice?: number;
  shippingPrice?: number;
  paymentMethodType?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  createdAt: string;
  updatedAt?: string;
  cartItems: OrderCartItem[];
  shippingAddress?: ShippingAddress;
}

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await Getuserorders();
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to load user orders:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const toggleOrder = (orderId: number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">My Orders</span>
        </nav>

        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-sm">
              <FiPackage size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            <FiShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse flex items-center gap-6"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="w-24 h-4 bg-gray-100 rounded-full" />
                  <div className="w-32 h-6 bg-gray-100 rounded" />
                  <div className="w-48 h-4 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
              Looks like you haven&apos;t placed any orders yet. Discover our latest products and start shopping!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-sm text-sm"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => {
              const isExpanded = !!expandedOrders[order.id];
              const firstItem = order.cartItems?.[0];
              const totalItems =
                order.cartItems?.reduce((acc, it) => acc + (it.count || 1), 0) ||
                order.cartItems?.length ||
                1;

              // Calculate shipping and subtotal ensuring sum equals totalOrderPrice
              const shippingPrice =
                order.shippingPrice ?? (order.totalOrderPrice > 500 ? 100 : 50);
              const subtotal = Math.max(0, order.totalOrderPrice - shippingPrice);

              return (
                <div
                  key={order.id || order._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all duration-200"
                >
                  {/* Summary Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-gray-100">
                        {firstItem?.product?.imageCover ? (
                          <img
                            src={firstItem.product.imageCover}
                            alt={firstItem.product.title || "Product image"}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <FiPackage className="text-gray-400" size={28} />
                        )}
                      </div>

                      {/* Order Info */}
                      <div>
                        {/* Status Badge */}
                        <div>
                          {order.isDelivered ? (
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Delivered
                            </span>
                          ) : order.isPaid ? (
                            <span className="bg-blue-50 text-blue-600 border border-blue-200/60 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              Paid
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-600 border border-amber-200/60 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                              <FiClock size={12} className="text-amber-500" />
                              Processing
                            </span>
                          )}
                        </div>

                        {/* Order ID */}
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                          # {order.id}
                        </h3>

                        {/* Meta items */}
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 mt-1.5">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={13} className="text-gray-400" />
                            {formatDate(order.createdAt)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-1">
                            <FiShoppingBag size={13} className="text-gray-400" />
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                          </span>
                          {order.shippingAddress?.city && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="flex items-center gap-1">
                                <FiMapPin size={13} className="text-gray-400" />
                                {order.shippingAddress.city}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Total Price */}
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-gray-900">
                            {order.totalOrderPrice}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 uppercase">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Payment Method Badge & Expand Button */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between self-stretch pt-2 sm:pt-0">
                      {/* Payment icon top right */}
                      <div
                        className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100"
                        title={
                          order.paymentMethodType === "cash"
                            ? "Cash on Delivery"
                            : "Online Payment"
                        }
                      >
                        {order.paymentMethodType === "cash" ? (
                          <FiDollarSign size={16} />
                        ) : (
                          <FiCreditCard size={16} />
                        )}
                      </div>

                      {/* Expand / Collapse Button */}
                      {isExpanded ? (
                        <button
                          type="button"
                          onClick={() => toggleOrder(order.id)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                        >
                          Hide
                          <FiChevronUp size={16} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleOrder(order.id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          Details
                          <FiChevronDown size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Section */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-fadeIn">
                      {/* Section Title */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 rounded-md bg-green-50 text-primary-600 flex items-center justify-center">
                          <FiShoppingBag size={12} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800">
                          Order Items
                        </h4>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-gray-100 mb-6">
                        {order.cartItems?.map((item) => (
                          <div
                            key={item._id}
                            className="py-3.5 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1 border border-gray-100">
                                <img
                                  src={item.product?.imageCover}
                                  alt={item.product?.title || "Product image"}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {item.product?.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.count} × {item.price} EGP
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-base font-bold text-gray-900">
                                {item.count * item.price}
                              </p>
                              <p className="text-[11px] font-semibold text-gray-400">
                                EGP
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Split Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Delivery Address Card */}
                        <div className="bg-[#fbfcfd] border border-gray-100 rounded-2xl p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center">
                                <FiMapPin size={12} />
                              </div>
                              <h5 className="text-xs font-semibold text-gray-700">
                                Delivery Address
                              </h5>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                              {order.shippingAddress?.city || "Egypt"}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                              {order.shippingAddress?.details || "No details provided"}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-4 pt-3 border-t border-gray-50">
                            <FiPhone size={13} className="text-gray-400" />
                            <span>
                              {order.shippingAddress?.phone || "No phone provided"}
                            </span>
                          </div>
                        </div>

                        {/* Order Summary Card */}
                        <div className="bg-[#fffdf5] border border-amber-200/60 rounded-2xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-5 h-5 rounded-md bg-amber-100/70 text-amber-600 flex items-center justify-center">
                              <FiFileText size={12} />
                            </div>
                            <h5 className="text-xs font-semibold text-amber-800">
                              Order Summary
                            </h5>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                              <span>Subtotal</span>
                              <span>{subtotal} EGP</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                              <span className="flex items-center gap-1.5">
                                <FiTruck size={13} className="text-gray-400" />
                                Shipping
                              </span>
                              <span>{shippingPrice} EGP</span>
                            </div>
                            <div className="pt-2 border-t border-amber-200/60 flex justify-between items-center text-gray-900 font-bold">
                              <span>Total</span>
                              <span className="text-base font-bold">
                                {order.totalOrderPrice} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
