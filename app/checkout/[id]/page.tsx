import React from "react";
import CheckOutForm from "../CheckOutForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Checkout({ params }: Props) {
  const { id } = await params;

  return (
    <section className="w-full">
      <CheckOutForm cartid={id} />
    </section>
  );
}