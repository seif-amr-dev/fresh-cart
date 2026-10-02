import Image from "next/image";
import HeroSlider from "./_components/Swiper/page";
import { GetCategories, GetProducts } from "@/Services/api/apiServices";
import { log } from "node:console";
import ProductCard from "./_components/productcard/productCard";
import Category  from "@/types/categorytypes";
import { IconHeadset, IconRefresh, IconShieldCheck, IconTruck } from "@tabler/icons-react";
import Newsletter from "./_components/newletter/Newsletter";
import { ProductsResponse } from "./subcategories/[id]/page";
import { Product } from "@/types/productsTypes";
import Link from "next/link";


export default async function Home() {
  const cat  = await  GetCategories();
  const pod = await GetProducts();
  






const trustBadges = [
  {
    icon: IconTruck,
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
  },
  {
    icon: IconRefresh,
    title: "Easy Returns",
    subtitle: "14-day return policy",
  },
  {
    icon: IconShieldCheck,
    title: "Secure Payment",
    subtitle: "100% secure checkout",
  },
  {
    icon: IconHeadset,
    title: "24/7 Support",
    subtitle: "Contact us anytime",
  },
];
































  return (
    <>
    <HeroSlider></HeroSlider>

<section className="mt-10 container  mx-auto  ">
<h2 className="before:content-[''] before:bg-primary-600 before:w-1 before:h-10
 before:absolute   
before:-left-2
before:
relative
font-bold
text-3xl
ms-5">

  shop by category
</h2>

<div className="grid md:grid-cols-6  mt-5   gap-4 ">

{cat?.map((cat) => {
  return (
    <Link  key={cat._id}  href={`/subcategories/${cat._id}`} className="hover:scale-105 transition-transform duration-300">
    
    
    
    <div 
      
      className="shadow-md py-6 px-4 flex flex-col justify-items-center items-center gap-2 "
    >
      <div className="img ">
        <Image  className="rounded-full w-20 h-20 object-contain"  src={cat.image} width={200} height={200} alt={cat.name || "category"} />

      </div>
      <p>{cat.name}</p>
      {/* ...rest of your content */}
    </div>
    
    
    
    
    
    
    </Link>
  );
})}




</div>





</section>



<section className="mt-10 container mx-auto">
<h2 className="before:content-[''] before:bg-primary-600 before:w-1 before:h-10
 before:absolute   
before:-left-2
before:
relative
font-bold
text-3xl
ms-5
mb-5">

  Products
</h2>



<div className="grid xl:grid-cols-4 gap-4  md:grid-cols-2">

{ pod.map((prod)=>{

return <ProductCard product={prod}

 key={prod._id} 


></ProductCard> 

})}



</div>












</section>


<div className="mt-10 container mx-auto mb-4">



<Newsletter></Newsletter>



</div>




 <div className="bg-primary-50 mt-5 mb-5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>








    </>
   
  );
}
