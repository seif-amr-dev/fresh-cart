import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function proxy(req:NextRequest){
    const protectedpages=["/cart","/wishlist","/allorders","/checkout"];
    const authpage=["/login","/signup"]
const pathName=req.nextUrl.pathname;
const myToken=await getToken({
    req:req,
    secret:process.env.NEXTAUTH_SECRET,
    secureCookie:process.env.NODE_ENV==="production"
})



const accessToken= myToken?.token;

if(!accessToken&&protectedpages.some((path)=> pathName.startsWith(path))){
return NextResponse.redirect(new URL("/login",req.nextUrl))
}


if(accessToken&&authpage.some((path)=> pathName.startsWith(path))){
return NextResponse.redirect(new URL("/",req.nextUrl))
}





return NextResponse.next();

}