"use client";

import Link from "next/link";
import logo from "../../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import {
  IconBabyCarriage,
  IconChevronDown,
  IconDotsVertical,
  IconGift,
  IconHeadset,
  IconHeart,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPackage,
  IconPhone,
  IconProgressBolt,
  IconReportMedical,
  IconSearch,
  IconShirtSport,
  IconShoppingCart,
  IconTruck,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function Navbar() {
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated";

    const { data: cartdata } = useCart({ enabled: isAuthenticated });
    const cartCount = cartdata?.numOfCartItems ?? 0;
  const { data: wishdata } = useWishlist({ enabled: isAuthenticated });
  const wishlistCount = wishdata?.count ?? 0;

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-white">
      {/* Announcement / Top Bar */}
      <div className="hidden lg:flex bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
        <div className="w-full flex justify-between items-center py-2 px-6 xl:px-10">
          <ul className="flex gap-6 *:flex *:gap-2 *:items-center">
            <li>
              <IconTruck stroke={2} size={18} />
              <span>Free Shipping on Orders 500 EGP</span>
            </li>
            <li>
              <IconGift stroke={2} size={18} />
              <span>New Arrivals Daily</span>
            </li>
          </ul>

          <ul className="flex gap-6 items-center *:flex *:gap-2 *:items-center">
            <li>
              <IconPhone stroke={2} size={18} />
              <a href="tel:+18001234567">+1 (800) 123-4567</a>
            </li>
            <li>
              <IconMail stroke={2} size={18} />
              <a href="mailto:support@freshcart.com">support@freshcart.com</a>
            </li>
            <li className="pl-6 border-l border-gray-300 gap-4!">
              {isAuthenticated ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5"
                >
                  <IconLogout stroke={2} size={16} />
                  <span>Log Out</span>
                </button>
              ) : (
                <>
                  <Link href={`/login`} className="flex items-center gap-1.5">
                    <IconUser stroke={2} size={16} />
                    <span>Sign In</span>
                  </Link>
                  <Link href={`/signup`} className="flex items-center gap-1.5">
                    <IconUserPlus stroke={2} size={16} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full py-4 px-6 xl:px-10 flex justify-between items-center gap-6">
        <Link href={`/`} className="shrink-0">
          <Image src={logo} alt="FreshCart" className="h-9 w-auto" />
        </Link>

        <search className="relative hidden lg:flex flex-1 max-w-xl">
          <input
            type="text"
            className="w-full h-11 rounded-full border border-gray-200 bg-white pl-5 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-colors duration-200"
            placeholder="Search for products, brands and more..."
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-9 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex justify-center items-center transition-colors duration-200"
            aria-label="Search"
          >
            <IconSearch stroke={2} size={18} />
          </button>
        </search>

        <button className="lg:hidden btn size-10 flex justify-center items-center bg-primary-600 text-white">
          <IconMenu2 stroke={2} />
        </button>

        <menu className="hidden lg:flex gap-6 items-center font-medium *:hover:text-primary-600 *:transition-colors *:duration-200 shrink-0">
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/shop`}>Shop</Link>
          </li>

          <li className="group/categories relative">
            <button className="flex items-center gap-1">
              <span>Categories</span>
              <IconChevronDown stroke={2} size={18} />
            </button>

            <ul className="hidden divide-y-2 divide-gray-300/20 shadow-xl group-hover/categories:flex flex-col absolute z-50 top-6 left-0 rounded-md bg-white w-60 *:bg-white *:hover:bg-gray-100 *:transition-colors *:duration-200">
              <li>
                <Link
                  href={`/category/6439d5b90049ad0b52b90048`}
                  className="p-3 flex gap-3 items-center"
                >
                  <IconUser stroke={2} />
                  <span>Men's Fashion</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/category/6439d58a0049ad0b52b9003f`}
                  className="p-3 flex gap-3 items-center"
                >
                  <IconShirtSport stroke={2} />
                  <span>Women's Fashion</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/category/6439d40367d9aa4ca97064cc`}
                  className="p-3 flex gap-3 items-center"
                >
                  <IconBabyCarriage stroke={2} />
                  <span>Baby & Toys</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/category/6439d30b67d9aa4ca97064b1`}
                  className="p-3 flex gap-3 items-center"
                >
                  <IconReportMedical stroke={2} />
                  <span>Beauty & Health</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/category/6439d2d167d9aa4ca970649f`}
                  className="p-3 flex gap-3 items-center"
                >
                  <IconProgressBolt stroke={2} />
                  <span>Electronics</span>
                </Link>
              </li>
              <li>
                <Link href={`/categories`} className="p-3 flex gap-3 items-center">
                  <IconDotsVertical stroke={2} />
                  <span>View All Categories</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href={`/brands`}>Brands</Link>
          </li>
        </menu>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="size-10 rounded-full bg-primary-50 flex justify-center items-center text-primary-600">
              <IconHeadset stroke={2} size={20} />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-gray-500">Support</p>
              <p className="text-sm font-semibold">24/7 Help</p>
            </div>
          </div>

          <Link href={`/wishlist`} aria-label="Wishlist" className="relative">
            <IconHeart stroke={2} />

                {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}



          </Link>

          <Link href={`/cart`} className="relative" aria-label="Cart">
            <IconShoppingCart stroke={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated && (
            <div className="group/profile relative">
              <button aria-label="User profile" className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200">
                <IconUser stroke={2} size={22} />
              </button>

              <ul className="hidden group-hover/profile:flex flex-col absolute z-50 top-full right-0 mt-2 shadow-xl rounded-md bg-white w-44 divide-y divide-gray-100 overflow-hidden *:bg-white *:hover:bg-gray-100 *:transition-colors *:duration-200">
                <li>
                  <Link
                    href="/allorders"
                    className="p-3 flex gap-2.5 items-center text-sm text-gray-700"
                  >
                    <IconPackage stroke={2} size={18} />
                    <span>Orders</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="btn rounded-full bg-primary-600 text-white px-5 py-2 flex items-center gap-2"
            >
              <IconLogout stroke={2} size={18} />
              <span>Log Out</span>
            </button>
          ) : (
            <Link
              href={`/login`}
              className="btn rounded-full bg-primary-600 text-white px-5 py-2 flex items-center gap-2"
            >
              <IconUser stroke={2} size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}