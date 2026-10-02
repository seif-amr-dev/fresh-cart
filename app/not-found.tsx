
import Link from "next/link"
import { IconArrowLeft, IconShoppingBag } from "@tabler/icons-react"

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center">

        {/* 404 */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tight text-primary-500/10 select-none">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center rotate-3">
              <IconShoppingBag
                size={42}
                stroke={1.7}
                className="text-primary-500 -rotate-3"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-7 mb-8">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved, deleted, or the link might be incorrect.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary-500/20"
          >
            <IconArrowLeft size={19} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
          >
            Browse Products
          </Link>

        </div>

        {/* Small decoration */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="w-8 h-1 rounded-full bg-primary-500/30" />
          <span className="w-2 h-2 rounded-full bg-primary-500/50" />
        </div>

      </div>
    </main>
  )
}
