import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){

const token= await getToken({
    req:req})

    if(!token){
        return NextResponse.json({message:"unAuthoraized please login first...",status:401})
    }
    const res= await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
        method:"GET",
        headers:{
            token:token.token,
            "content-type":"application/json"
        }
    })
    
    if(!res.ok){
                return NextResponse.json({message:"something went wrong..",status:400})

    }
   const data= await res.json();
   return NextResponse.json(data)

}