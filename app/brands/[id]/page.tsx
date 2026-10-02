import ProductCard from '@/app/_components/productcard/productCard'
import { IconBox } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

interface Ibrands {
  params: Promise<{ id: string }>
}

interface ISubcategory {
  _id: string
  name: string
  slug: string
  category: string
}

interface ICategory {
  _id: string
  name: string
  slug: string
  image: string
}

interface IBrand {
  _id: string
  name: string
  slug: string
  image: string
}

interface IProduct {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  priceAfterDiscount?: number
  availableColors: string[]
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

interface IMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

interface IProductsResponse {
  results: number
  metadata: IMetadata
  data: IProduct[]
}

export default async function BrandDetails({ params }: Ibrands) {
  const { id } = await params

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
  )

  const resdata: IProductsResponse = await res.json()
  const data = resdata.data

  console.log(resdata)
  console.log(data)

  if (data.length === 0) {
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
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>

            <span>/</span>

            <span className="text-white font-medium">
              {data[0].brand.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <IconBox size={28} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                {data[0].brand.name}
              </h1>

              <p className="text-white/90 mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-10">
        {data.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
            />
          )
        })}
      </div>
    </>
  )
}