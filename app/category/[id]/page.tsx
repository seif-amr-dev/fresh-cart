import ProductCard from '@/app/_components/productcard/productCard';
import { Icat } from '@/app/categories/[id]/page'
import { ProductsResponse } from '@/types/specificCategorytype';

import { IconFolder } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function page({params}:Icat) {

    const {id}= await params;
    const res= await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
const data :ProductsResponse = await res.json();
const resdata= data.data;
    console.log(resdata);
    


 if (resdata.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center text-center">

          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-10 h-10 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-8.954 5.372a2.5 2.5 0 01-2.592 0L3.75 7.5m16.5 0A2.25 2.25 0 0018 5.25H6A2.25 2.25 0 003.75 7.5m16.5 0v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-green-500 mb-2">
            No Products Found
          </h3>

          <p className="text-gray-400 text-sm max-w-md">
            There are no products available for this brand at the moment.
          </p>

        </div>
      </div>
    )
  }













  return (
   <>
   <section className="bg-[#0AAD0A] text-white py-10">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs mb-6 text-emerald-100">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:underline">Categories</Link>
            <span>/</span>
            <span className="text-white font-medium">{resdata[0]?.subcategory[0]?.name}</span>
          </div>

          {/* Banner Title */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20">
              <Image src={resdata[0]?.images[0]} alt={resdata[0]?.title || "product"}  width={100} height={100} className='h-10 w-10 object-contain' />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{resdata[0]?.subcategory[0]?.name}</h1>
              <p className="mt-1 text-sm text-emerald-100">  browse categories in {resdata[0]?.subcategory[0]?.name}</p>
            </div>
          </div>
        </div>
      </section>
   
   <div className='mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 px-6'>


{resdata.map((item)=>{

return  <ProductCard key={item._id} product={item}></ProductCard>

})}
   </div>
   
   
   
   
   
   
   
   
   
   
   
   </>
  )
}
