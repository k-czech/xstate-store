"use client";

import { useCart } from "@/contexts/CartProvider";
import { formatMoney } from "@/lib/utils";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Loader } from "./Loader";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { useMemo } from "react";

export const CartProducts = () => {
	const { state: cart, removeProduct } = useCart();

	const totalPrice = useMemo(() => {
		return cart.cartProducts.products.reduce((acc, product) => {
			return acc + Number(product.price) * Number(product.quantity);
		}, 0);
	}, [cart.cartProducts.products]);

	const isProductDeliveryRequired = useMemo(() => {
		return cart.cartProducts.products.some(
			(product) => product.requiresShipping,
		);
	}, [cart.cartProducts.products]);

	return cart.loading ? (
		<Loader />
	) : (
		<>
			<div className="py-8">
				<div>
					<h2 className="text-2xl font-semibold leading-tight">Twój koszyk</h2>
				</div>
				<div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
					<div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
						<table className="min-w-full leading-normal">
							<thead>
								<tr>
									<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
										Product
									</th>
									<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
										Ilość
									</th>
									<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
										Cena
									</th>
									<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
										Wysylka
									</th>
									<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3"></th>
								</tr>
							</thead>
							<tbody>
								{cart.cartProducts.products.length > 0 ? (
									cart.cartProducts.products.map((product) => (
										<tr key={product.id}>
											<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
												<div className="flex">
													<div className="ml-3">
														<p className="whitespace-no-wrap text-gray-900">
															{product.name}
														</p>
													</div>
												</div>
											</td>
											<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
												<p className="whitespace-no-wrap text-gray-900">
													{product.quantity}
												</p>
											</td>
											<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
												<p className="whitespace-no-wrap text-gray-900">
													{formatMoney(Number(product.price))}
												</p>
											</td>
											<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
												<span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
													<span
														aria-hidden
														className="absolute inset-0 rounded-full bg-green-200 opacity-50"
													></span>
													<span className="relative">
														{product.requiresShipping ? "Tak" : "Nie"}
													</span>
												</span>
											</td>
											<td className="border-b border-gray-200 bg-white px-5 py-5 text-right text-sm">
												<Button
													type="button"
													className="inline-block bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
													onClick={() => removeProduct(product)}
												>
													<Trash2 />
												</Button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={5}
											className="space-y-2 py-8 text-center text-sm"
										>
											<ShoppingBag className="mx-auto h-12 w-12 text-slate-300" />
											<p>Brak produktów w koszyku</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{cart.cartProducts.products.length !== 0 && (
				<div className="flex flex-col gap-4">
					<div className="flex gap-2 self-end">
						<p className="text-xl">Razem do zapłaty:</p>
						<p className="text-xl font-semibold">{formatMoney(totalPrice)}</p>
					</div>
					<NextLink
						href={isProductDeliveryRequired ? "/checkout" : "/payment"}
						className="inline-flex w-full max-w-xs items-center justify-center self-end whitespace-nowrap rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					>
						{isProductDeliveryRequired
							? "Przejdz do dostawy"
							: "Przejdz do płatnosci"}
					</NextLink>
				</div>
			)}
		</>
	);
};
