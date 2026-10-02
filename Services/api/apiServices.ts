"use server"

import { shippingData } from "@/app/checkout/CheckOutForm";
import { CategoriesResponse, Category } from "@/types/categorytypes";
import { Product, ProductsResponse } from "@/types/productsTypes";
import { userdata } from "@/types/userdata";
import { UseId } from "@/utils/getUserid";
import { UseToken } from "@/utils/UseToken";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { json } from "stream/consumers";




export  async function GetCategories():Promise< Category[]>{
const res= await fetch("https://ecommerce.routemisr.com/api/v1/categories",{
method:"GET",
})

const data= await res.json();

return data.data



}





export async function GetProducts():Promise<  Product[] >{


const res= await fetch("https://ecommerce.routemisr.com/api/v1/products");
const data= await res.json();

return data.data





}


export async function Signuser(values:userdata){

const res=await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
    method:"POST",
    
    body:JSON.stringify(values)
    ,
    headers:{
        "content-type":"application/json"
    }
})


const response = await res.json()

return response;


}


export async function GetProduct(id:string){

const res= await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

const data= await res.json();


return data



}




export async function Addtocart(productid: string) {
  try {
    console.log("1 - Addtocart started");
    
    const Token = await UseToken();

    console.log("2 - Token:", Token);

    if (!Token) {
      return {
        success: false,
        message: "Unauthorized, please login first...",
      };
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        method: "POST",
        headers: {
          token: Token,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: productid,
        }),
      }
    );

    console.log("3 - Status:", res.status);

    const data = await res.json();

    console.log("4 - API Response:", data);

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to add product to cart",
      };
    }

    return data;
  } catch (error) {
    console.error("5 - Error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}


export async function UpdateCart(productid: string, currentcount: number) {
  const token = await UseToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productid}`, {
    method: "PUT",
    body: JSON.stringify({ count: currentcount + 1 }),
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("UpdateCart failed:", res.status, data);
    throw new Error(data?.message ?? `Request failed with status ${res.status}`);
  }

  return data;
}





export async function DecreaseCart(productid: string, currentcount: number) {
  const token = await UseToken();
if(currentcount==0){
  return 
}

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productid}`, {
    method: "PUT",
    body: JSON.stringify({ count: currentcount -1 }),
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("UpdateCart failed:", res.status, data);
    throw new Error(data?.message ?? `Request failed with status ${res.status}`);
  }

  return data;
}



export async function DeleteProduct(productid: string) {
  const token = await UseToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productid}`, {
    method: "DELETE",
   
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("DeleteCart failed:", res.status, data);
    throw new Error(data?.message ?? `Request failed with status ${res.status}`);
  }

  return data;
}


export async function ClearCart(){
const token= await UseToken();


const res= await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
method:"DELETE",
headers:{
  token:token,
  "content-type":"application/json"
}

})
if(!res.ok){
  throw new Error("something went wrong")
}
if(res.ok){
const data= await res.json();
return data

}


}

export async function CreateOnlineOrder(
  cartid: string,
  values: shippingData
) {
  const token = await UseToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/checkout-session/${cartid}?url=${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}`,
    {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: values,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.log("ONLINE ORDER ERROR:", data);
    return { status: "error", message: data.message || "Something went wrong" };
  }

  return data;
}

export async function CreateCashOrder(
  cartid: string,
  values: shippingData
) {
  const token = await UseToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartid}`,
    {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: values,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.log("ORDER ERROR:", data);
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}


export async function Getuserorders() {
  try {
    const id = await UseId();
    if (!id) {
      return [];
    }
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.error("Getuserorders error:", res.status);
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Getuserorders exception:", error);
    return [];
  }
}



export async function AddtoWishList(productid: string) {
  const token = await UseToken();

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: productid,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Couldn't add product to wishlist");
  }

  return data;
}


export async function RemoveFromWishlist(productid: string) {
  const token = await UseToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "content-type": "application/json",
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Couldn't delete product from wishlist");
  }

  return data;
}


/*
missing with the code 
ProductsResponse|
categoriesresponse |



*/