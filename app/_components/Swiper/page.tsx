"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import head from "../../../assets/images/home-slider-1.png";

export default function HeroSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
         if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }
        }}
        className="[&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300"
      >
        <SwiperSlide>
          <div
            className="relative h-[420px] lg:h-[520px] flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(10,173,10,0.85) 0%, rgba(10,173,10,0.35) 60%, rgba(10,173,10,0.15) 100%), url(${head.src ?? head})`,
            }}
          >
            <div className="container mx-auto px-6 xl:px-10">
              <div className="max-w-lg text-white">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Fresh Products Delivered
                  <br />
                  to your Door
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Get 20% off your first order
                </p>

                <div className="mt-8 flex gap-4">
                  <Link
                    href="/shop"
                    className="rounded-full bg-white text-primary-600 font-semibold px-6 py-3 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/offers"
                    className="rounded-full border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative h-[420px] lg:h-[520px] flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(10,173,10,0.85) 0%, rgba(10,173,10,0.35) 60%, rgba(10,173,10,0.15) 100%), url(${head.src ?? head})`,
            }}
          >
            <div className="container mx-auto px-6 xl:px-10">
              <div className="max-w-lg text-white">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Weekly Deals
                  <br />
                  on Every Aisle
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Stock up and save big this week
                </p>

                <div className="mt-8 flex gap-4">
                  <Link
                    href="/shop"
                    className="rounded-full bg-white text-primary-600 font-semibold px-6 py-3 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/offers"
                    className="rounded-full border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative h-[420px] lg:h-[520px] flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(10,173,10,0.85) 0%, rgba(10,173,10,0.35) 60%, rgba(10,173,10,0.15) 100%), url(${head.src ?? head})`,
            }}
          >
            <div className="container mx-auto px-6 xl:px-10">
              <div className="max-w-lg text-white">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Organic & Healthy
                  <br />
                  Picked for You
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Farm-fresh produce, delivered daily
                </p>

                <div className="mt-8 flex gap-4">
                  <Link
                    href="/shop"
                    className="rounded-full bg-white text-primary-600 font-semibold px-6 py-3 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/offers"
                    className="rounded-full border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Prev / Next arrows */}
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 size-11 rounded-full bg-white/90 hover:bg-white text-gray-800 items-center justify-center shadow-md transition-colors duration-200"
      >
        <IconChevronLeft stroke={2} size={22} />
      </button>
      <button
        ref={nextRef}
        aria-label="Next slide"
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 size-11 rounded-full bg-white/90 hover:bg-white text-gray-800 items-center justify-center shadow-md transition-colors duration-200"
      >
        <IconChevronRight stroke={2} size={22} />
      </button>

      {/* Pagination dots */}
      <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2" />
    </div>
  );
}