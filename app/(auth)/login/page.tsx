"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {

  const {register,formState,handleSubmit }=useForm({
defaultValues:{
email:"",
password:""

}

 



  }





)

const router =useRouter();




async function Loguser(values) {
  const result = await signIn("credentials", {
    ...values,
    redirect: false,
  });

  if (result?.ok) {
    toast.success("Login successful!");
    router.push("/");
  } else {
    toast.error("Invalid email or password.");
  }
}






  return (
    <div className="min-h-screen bg-white">
      {/* top info bar */}
      <div className="hidden md:flex items-center justify-between px-8 lg:px-16 py-2.5 border-b border-gray-100 text-sm text-gray-600">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <TruckMiniIcon />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="flex items-center gap-1.5">
            <GiftIcon />
            New Arrivals Daily
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <PhoneIcon />
            +1 (800) 123-4567
          </span>
          <span className="flex items-center gap-1.5">
            <MailIcon />
            support@freshcart.com
          </span>
        </div>
      </div>

      {/* main content */}
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-40px)]">
        {/* left side */}
        <div className="hidden md:flex items-center justify-center bg-primary-50 px-12 lg:px-20 py-16">
          <div className="w-full max-w-md">
            <GroceryIllustration />
          </div>
        </div>

        {/* right side — form */}
        <div className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-center">
              <span className="text-gray-900">Fresh</span>
              <span className="text-primary-600">Cart</span>
            </h1>
            <h2 className="text-3xl font-bold text-center text-gray-900 mt-4">
              Welcome Back!
            </h2>
            <p className="text-center text-gray-500 mt-2">
              Sign in to continue your fresh shopping experience
            </p>

            {/* social buttons */}
            <div className="flex flex-col gap-3 mt-8">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FacebookIcon />
                Continue with Facebook
              </button>
            </div>

            {/* divider */}
            <div className="flex items-center gap-4 my-6">
              <span className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-medium tracking-wide text-gray-400">
                OR CONTINUE WITH EMAIL
              </span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            {/* form fields */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(Loguser)}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <MailIcon />
                  </span>
                  <input
                {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 rounded-md pl-10 pr-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockIcon />
                  </span>
                  <input
                  {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-200 rounded-md pl-10 pr-10 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-primary-600 w-4 h-4"
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                className="bg-primary-600 text-white font-semibold rounded-md py-3 hover:bg-primary-700 transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-gray-700 mt-6">
              New to FreshCart?{" "}
              <Link
                href="/signup"
                className="text-primary-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* trust badges */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <LockIcon />
                SSL Secured
              </span>
              <span className="flex items-center gap-1.5">
                <UsersIcon />
                50K+ Users
              </span>
              <span className="flex items-center gap-1.5">
                <StarIcon />
                4.9 Rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- inline icons ---------- */

function TruckMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17.5" cy="18" r="1.5" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18" />
      <path d="M12 8v13" />
      <path d="M12 8c-1.5-4-6-4-6-1.5S9 8 12 8z" />
      <path d="M12 8c1.5-4 6-4 6-1.5S15 8 12 8z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 6 10-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" />
      <circle cx="17.5" cy="9" r="2.5" />
      <path d="M15.5 14.2c2.7.5 4.5 2.6 4.5 5.8" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.3 21.3 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.6.4-2.4V6.5H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

/* ---------- illustration ---------- */

function GroceryIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="170" fill="#DCFCE7" />

      {/* cart body */}
      <path
        d="M110 150h200l-22 110a16 16 0 0 1-15.7 13H147.7a16 16 0 0 1-15.7-13L110 150z"
        fill="#16A34A"
      />
      <path d="M90 120h30l20 30h190" stroke="#166534" strokeWidth="10" strokeLinecap="round" />
      <circle cx="160" cy="305" r="16" fill="#166534" />
      <circle cx="260" cy="305" r="16" fill="#166534" />

      {/* produce poking out of cart */}
      <circle cx="150" cy="135" r="26" fill="#EF4444" />
      <path d="M150 112c0-10 8-16 16-14" stroke="#166534" strokeWidth="5" strokeLinecap="round" />

      <circle cx="200" cy="120" r="30" fill="#F97316" />
      <path d="M200 93v-10" stroke="#166534" strokeWidth="5" strokeLinecap="round" />
      <path d="M190 88l10-8 10 8" stroke="#166534" strokeWidth="5" strokeLinecap="round" fill="none" />

      <ellipse cx="255" cy="130" rx="24" ry="30" fill="#84CC16" />
      <path d="M255 103c4-8 12-10 18-6" stroke="#166534" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* leafy bits */}
      <path d="M120 135c-6-14 4-26 18-26" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M290 140c10-10 8-26-6-30" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* sparkle accents */}
      <circle cx="80" cy="90" r="5" fill="#16A34A" />
      <circle cx="320" cy="100" r="7" fill="#16A34A" />
      <circle cx="330" cy="260" r="5" fill="#16A34A" />
      <circle cx="70" cy="250" r="6" fill="#16A34A" />
    </svg>
  );
}