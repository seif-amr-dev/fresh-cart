"use client"
import { schema } from "@/schema/zodvaldation";
import { Signuser } from "@/Services/api/apiServices";
import { userdata } from "@/types/userdata";
import Image from "next/image";

import { useRouter } from 'next/navigation';

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
export default function SignupPage() {
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(schema)
  })

  async function createaccount(data: userdata) {
    const value = await Signuser(data);
    console.log(value);
    if (value.message === "success") {
      router.push("/login")
    }
    if(value.message==="Account Already Exists"){
     toast.error("Account Already Exists")
    }
  
  }

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* left side */}
      <div className="hidden md:flex flex-col justify-center px-12 lg:px-20 py-16">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to <span className="text-primary-600">FreshCart</span>
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          Join thousands of happy customers who enjoy fresh groceries
          delivered right to their doorstep.
        </p>

        <div className="mt-10 flex flex-col gap-6">
          <Feature
            icon="star"
            title="Premium Quality"
            desc="Premium quality products sourced from trusted suppliers."
          />
          <Feature
            icon="truck"
            title="Fast Delivery"
            desc="Same-day delivery available in most areas"
          />
          <Feature
            icon="shield"
            title="Secure Shopping"
            desc="Your data and payments are completely secure"
          />
        </div>

        <div className="mt-10 bg-white border border-gray-100 rounded-lg shadow-sm p-5">
          <div className="flex items-center gap-3">
            <Image
              src="/avatar-placeholder.png"
              alt="Sarah Johnson"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Sarah Johnson</p>
              <div className="flex gap-0.5 text-yellow-400">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-600 italic">
            &quot;FreshCart has transformed my shopping experience. The
            quality of the products is outstanding, and the delivery is
            always on time. Highly recommend!&quot;
          </p>
        </div>
      </div>

      {/* right side — form */}
      <div className="flex items-center justify-center bg-gray-50 md:bg-white px-6 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Start your fresh journey with us today
          </p>

          {/* social buttons */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <GoogleIcon />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FacebookIcon />
              Facebook
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-4 my-6">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* form fields */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(createaccount)} noValidate>
            <FormField
              label="Name"
              error={errors.name?.message as string | undefined}
            >
              <input
                {...register("name")}
                type="text"
                placeholder="Ali"
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              label="Email"
              error={errors.email?.message as string | undefined}
            >
              <input
                {...register("email")}
                type="email"
                placeholder="ali@example.com"
                className={inputClass(!!errors.email)}
              />
            </FormField>

            <FormField
              label="Password"
              error={errors.password?.message as string | undefined}
            >
              <input
                {...register("password")}
                type="password"
                placeholder="create a strong password"
                className={inputClass(!!errors.password)}
              />
            </FormField>

            <FormField
              label="Confirm Password"
              error={errors.rePassword?.message as string | undefined}
            >
              <input
                {...register("rePassword")}
                type="password"
                placeholder="confirm your password"
                className={inputClass(!!errors.rePassword)}
              />
            </FormField>

            <FormField
              label="Phone Number"
              error={errors.phone?.message as string | undefined}
            >
              <input
                {...register("phone")}
                type="tel"
                placeholder="+1 234 567 8900"
                className={inputClass(!!errors.phone)}
              />
            </FormField>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="mt-0.5 accent-primary-600 w-4 h-4"
              />
              I agree to the{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold rounded-md py-3 hover:bg-primary-700 transition-colors"
            >
              <UserPlusIcon />
              Create My Account
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="#" className="text-primary-600 font-medium hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- form helpers ---------- */

function inputClass(hasError: boolean) {
  return [
    "w-full border rounded-md px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:border-transparent transition-colors",
    hasError
      ? "border-red-300 focus:ring-red-400 bg-red-50/40"
      : "border-gray-200 focus:ring-primary-500",
  ].join(" ");
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        <span className="text-red-500">*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-150">
          <ErrorIcon />
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- small presentational pieces ---------- */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: "star" | "truck" | "shield";
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
        {icon === "star" && <StarIcon />}
        {icon === "truck" && <TruckIcon />}
        {icon === "shield" && <ShieldIcon />}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}

/* ---------- inline icons (swap for tabler/icons-react if you prefer) ---------- */

function ErrorIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17.5" cy="18" r="1.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M19 8v5M16.5 10.5h5" />
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