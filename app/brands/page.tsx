import { BrandsApiResponse } from '@/types/Brandstypes';
import Link from 'next/link';
import React from 'react';
import { IconTags } from "@tabler/icons-react";

export default async function Brands() {

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  const data: BrandsApiResponse = await res.json();
  const Brands = data.data;

  return (
    <>
      {/* Hero Section */}
      <div className="h-60 w-full bg-[#9256FF]">

        {/* Breadcrumb */}
        <p className="pt-10 ms-4 text-white font-semibold text-left">
          <Link
            href="/"
            className="ml-8 opacity-70 hover:opacity-100"
          >
            Home /
          </Link>
          <span className="ml-2">Brands</span>
        </p>

        {/* Hero Content */}
        <div className="flex gap-3 mt-8 ms-10">

          {/* Icon */}
          <div className="rounded-xl bg-[#A067FF] w-20 h-20 flex items-center justify-center">
            <IconTags
              size={40}
              className="text-white"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2 justify-center">
            <h3 className="text-white font-bold text-3xl">
              Top Brands
            </h3>

            <p className="text-white font-medium opacity-70">
              Shop from your favorite brands
            </p>
          </div>

        </div>
      </div>


      {/* Brands */}
      <div className="px-4 py-10">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-6
          gap-5
        ">

          {Brands.map((brand) => {

            return (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="
                  group
                  bg-white
                  rounded-2xl
                  border
                  border-gray-200
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  duration-300
                  p-5
                  flex
                  flex-col
                  items-center
                  justify-center
                  min-h-[305px]
                "
              >

                {/* Logo Container */}
                <div className="
                  w-full
                  h-48
                  bg-gray-50
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  p-5
                  group-hover:bg-gray-100
                  transition-colors
                ">

                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="
                      max-w-full
                      max-h-full
                      object-contain
                    "
                  />

                </div>

                {/* Brand Name */}
                <h3 className="
                  mt-4
                  text-gray-900
                  font-semibold
                  text-lg
                  text-center
                  group-hover:text-[#9256FF]
                  transition-colors
                ">
                  {brand.name}
                </h3>

              </Link>
            );

          })}

        </div>

      </div>
    </>
  );
}