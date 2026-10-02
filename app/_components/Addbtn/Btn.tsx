import { Addtocart } from '@/Services/api/apiServices';
import { BtnProps } from '@/types/productsTypes';
import { IconPlus, IconShoppingCartPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

export default function Btn({ isdetails, productid }: BtnProps) {
  // 1. Declare hooks at the top level
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const { mutate, isPending } = useMutation({
    mutationFn: Addtocart,
    onSuccess: (data) => {
      if (data?.success === false) {
        toast.error(data.message || "Failed to add product");
        return;
      }
      toast.success("Product added successfully to your cart");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  // 2. Centralized click handler
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("You need to login first");
      return;
    }
    mutate(productid);
  };

  // 3. Render logic
  if (!isdetails) {
    return (
      <button
        type="button"
        disabled={isPending}
        onClick={handleAddToCart}
        className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
      >
        <IconPlus size={18} />
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleAddToCart}
      className="flex-1 h-12 rounded-xl bg-primary-600 text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary-600/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
    >
      <IconShoppingCartPlus size={19} />
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}