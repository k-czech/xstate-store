"use client";

import { useCart } from "@/contexts/CartProvider";

export const CartBadge = () => {
	const { state } = useCart();
	const quantity = state.cartProducts.products?.length || 0;

	return (
		<div className="absolute -right-2 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
			{quantity}
		</div>
	);
};
