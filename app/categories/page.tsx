import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  IconSearch, 
  IconHeadset, 
  IconHeart, 
  IconShoppingCart, 
  IconUser, 
  IconLayoutGrid, 
  IconChevronDown 
} from '@tabler/icons-react';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  results: number;
  data: Category[];
}

export default async function Categories() {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
    next: { revalidate: 3600 }
  });
  const data: CategoriesResponse = await res.json();

  // Show all categories from the API response
  const categories: Category[] = data.data;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* 1. Header */}
     

      {/* 2. Hero Banner */}
      <section className="bg-[#0AAD0A] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1.5 text-xs mb-8">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="opacity-70">Categories</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-lg">
              <IconLayoutGrid size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">All Categories</h1>
              <p className="mt-2 text-lg opacity-80">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link href={`/categories/${category._id}` }  key={category._id} >
            <div
             
              className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-contain p-2"
                />
              </div>
              <h2 className="text-sm font-semibold text-gray-900 group-hover:text-[#0AAD0A]">
                {category.name}
              </h2>
            </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}