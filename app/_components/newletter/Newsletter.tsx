// app/_components/Newsletter/Newsletter.tsx
"use client";

import { useState } from "react";
import {
  IconMail,
  IconLeaf,
  IconTruck,
  IconTag,
  IconArrowRight,
  IconSparkles,
  IconDeviceMobile,
  IconBrandApple,
  IconBrandGooglePlay,
  IconStarFilled,
} from "@tabler/icons-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up newsletter subscription API
    console.log("subscribe:", email);
  }

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <div className="bg-primary-50 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: Newsletter */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center shrink-0">
              <IconMail size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary-600 uppercase tracking-wide">
                Newsletter
              </p>
              <p className="text-sm text-gray-500">50,000+ subscribers</p>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Get the Freshest Updates{" "}
            <span className="text-primary-600">Delivered Free</span>
          </h2>

          <p className="text-gray-500 mt-3">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="flex items-center gap-2 bg-white rounded-full pl-2 pr-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
                <IconLeaf size={14} className="text-primary-600" />
              </span>
              Fresh Picks Weekly
            </span>
            <span className="flex items-center gap-2 bg-white rounded-full pl-2 pr-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
                <IconTruck size={14} className="text-primary-600" />
              </span>
              Free Delivery Codes
            </span>
            <span className="flex items-center gap-2 bg-white rounded-full pl-2 pr-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
                <IconTag size={14} className="text-primary-600" />
              </span>
              Members-Only Deals
            </span>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-primary-600 text-white font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shrink-0"
            >
              Subscribe
              <IconArrowRight size={16} />
            </button>
          </form>

          <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-3">
            <IconSparkles size={14} className="text-primary-500" />
            Unsubscribe anytime. No spam, ever.
          </p>
        </div>

        {/* Right: App download */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 w-fit bg-primary-500/15 text-primary-400 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full mb-5">
            <IconDeviceMobile size={14} />
            Mobile App
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Shop Faster on Our App
          </h3>

          <p className="text-gray-400 mt-2">
            Get app-exclusive deals & 15% off your first order.
          </p>

          <div className="flex flex-col gap-3 mt-6">
            <a
              href="#"
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-xl px-4 py-3"
            >
              <IconBrandApple size={26} className="text-white shrink-0" />
              <div className="leading-tight">
                <p className="text-[11px] text-gray-400">Download on</p>
                <p className="text-sm font-semibold text-white">App Store</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-xl px-4 py-3"
            >
              <IconBrandGooglePlay size={22} className="text-white shrink-0" />
              <div className="leading-tight">
                <p className="text-[11px] text-gray-400">Get it on</p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <IconStarFilled key={i} size={14} className="text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-300">
              4.9 &middot; 100K+ downloads
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}