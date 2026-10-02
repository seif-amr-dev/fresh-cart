// app/_components/Footer/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/images/freshcart-logo.svg";
import {
  IconTruck,
  IconRefresh,
  IconShieldCheck,
  IconHeadset,
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
  IconCreditCard,
} from "@tabler/icons-react";












const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/category/6439d2d167d9aa4ca970649f" },
      { label: "Men's Fashion", href: "/category/6439d5b90049ad0b52b90048" },
      { label: "Women's Fashion", href: "/category/6439d58a0049ad0b52b9003f" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* Trust badges strip */}
     
      {/* Dark footer */}
      <div className="bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 bg-white rounded-xl px-3 py-2">
              <Image src={logo} alt="FreshCart" className="h-7 w-auto" />
            </div>

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              FreshCart is your one-stop destination for quality products.
              From fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <IconPhone size={16} className="text-primary-500 shrink-0" />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <IconMail size={16} className="text-primary-500 shrink-0" />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
              <li className="flex items-center gap-2">
                <IconMapPin size={16} className="text-primary-500 shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-5">
              {[IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <IconCreditCard size={16} />
                Visa
              </span>
              <span className="flex items-center gap-1.5">
                <IconCreditCard size={16} />
                Mastercard
              </span>
              <span className="flex items-center gap-1.5">
                <IconCreditCard size={16} />
                PayPal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}