import React from 'react';
import Link from 'next/link';
import { 
  IconSearch, 
  IconHeadset, 
  IconHeart, 
  IconShoppingCart, 
  IconUser, 
  IconChevronDown, 
  IconArrowLeft,
  IconFolder,
  IconTruck,
  IconGift,
  IconPhoneCall,
  IconMail,
  IconLogout
} from '@tabler/icons-react';

export interface Icat {
  params: Promise<{ id: string }>;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface SubcategoriesResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Subcategory[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoryResponse {
  data: Category;
}

export default async function SubcategoriesPage({ params }: Icat) {
  const { id } = await params;

  // Fetch subcategories
  const resSub = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`, {
    next: { revalidate: 3600 }
  });
  const dataSub: SubcategoriesResponse = await resSub.json();
  const subcategories: Subcategory[] = dataSub.data || [];

  // Fetch parent category info to display the name (e.g., Electronics)
  const resCat = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    next: { revalidate: 3600 }
  });
  const dataCat: CategoryResponse = await resCat.json();
  const categoryName = dataCat.data?.name || 'Category';

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
     

      {/* 2. Main Header */}
   

      {/* 3. Green Hero Banner */}
      <section className="bg-[#0AAD0A] text-white py-10">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs mb-6 text-emerald-100">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:underline">Categories</Link>
            <span>/</span>
            <span className="text-white font-medium">{categoryName}</span>
          </div>

          {/* Banner Title */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20">
              <IconFolder size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
              <p className="mt-1 text-sm text-emerald-100">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Subcategories Grid */}
      <main className="container mx-auto px-6 py-8">
        {/* Back Link */}
        <Link 
          href="/categories" 
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 font-medium"
        >
          <IconArrowLeft size={16} />
          Back to Categories
        </Link>

        {/* Counter */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          {dataSub.results || subcategories.length} Subcategories in {categoryName}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
           <Link  key={sub._id} href={`/subcategories/${sub._id}`}>
           
           
            <div
             
              className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="bg-emerald-50 p-3 rounded-lg text-[#0AAD0A]">
                <IconFolder size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#0AAD0A] transition-colors text-sm">
                {sub.name}
              </h3>
            </div>
           
           
           
           
           </Link>
          ))}
        </div>
      </main>
    </div>
  );
}