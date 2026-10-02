import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "my login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Write your email",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Write your password",
        },
      },

     async authorize(credentials) {
  console.log("CREDENTIALS:", credentials);

  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    }
  );

  console.log("API STATUS:", res.status);

  const payload = await res.json();

  console.log("API RESPONSE:", payload);

  if (!res.ok) {
    return null;
  }
const userdata:{id:string}= jwtDecode(payload.token)
console.log("token",userdata);

  return {
    id: userdata.id,
    name: payload.user.name,
    email: payload.user.email,
    token: payload.token,
  };
}




    }),
  ],
callbacks:{
jwt({token,user}){
  if(user){
token.id=user.id;
token.token=user.token
  }
  return token 
}, 
session({session,token}){
  if(token){
session.user.id=token.id
  }
  return session
}
},
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);