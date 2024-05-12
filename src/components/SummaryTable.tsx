"use client";

import { useCustommerAddress } from "@/contexts/AddressProvider";
import { useCart } from "@/contexts/CartProvider";
import { usePayment } from "@/contexts/PaymentProvider";
import { formatMoney } from "@/lib/utils";
import { Loader } from "./Loader";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { executeApi } from "@/services/api-config";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const SummaryTable = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { state: custommerAddress, removeAddress } = useCustommerAddress();
	const { state: cart, removeCart, totalPrice } = useCart();
	const { paymentMethod, removePaymentMethod } = usePayment();

	const onSubmitOrder = useCallback(async () => {
		setLoading(true);
		await executeApi({
			dummyData: {
				address: custommerAddress.address,
				products: cart.cartProducts.products,
				paymentMethod,
				totalPrice,
			},
		})
			.then((res) => {
				if (res) {
					router.push(`/success?session_id=${uuidv4()}`);
					setLoading(false);
				}
			})
			.catch((err) => {
				throw new Error(err);
			})
			.finally(() => {
				setLoading(false);
			});
		removeCart();
		removePaymentMethod();
		removeAddress();
	}, [custommerAddress, cart, paymentMethod]);

	return (
		<>
			{cart.loading ? (
				<Loader />
			) : (
				<div className="py-8">
					<div>
						<h2 className="text-2xl font-semibold leading-tight">
							Podsumowanie
						</h2>
					</div>
					<div className="overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
						<div className="inline-block min-w-full space-y-6 overflow-hidden rounded-lg shadow-md">
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
											Produkt
										</th>
										<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
											Ilość
										</th>
										<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
											Cena
										</th>
									</tr>
								</thead>
								<tbody>
									{cart.cartProducts.products.length > 0 &&
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
											</tr>
										))}
								</tbody>
							</table>
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
											Adres do dostawy
										</th>
										<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
											Dostawa
										</th>
										<th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
											Metoda płatności
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
											{custommerAddress.address.city ? (
												<>
													<p className="whitespace-no-wrap text-gray-900">
														{custommerAddress.address.street}{" "}
														{custommerAddress.address.city}
													</p>
													<p className="whitespace-no-wrap font-semibold text-gray-900">
														{custommerAddress.address.country === "pl"
															? "Polska"
															: custommerAddress.address.country === "usa"
																? "Stany Zjednoczone"
																: custommerAddress.address.country}
													</p>
												</>
											) : (
												<p>-</p>
											)}
										</td>
										<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
											{custommerAddress.address.deliveryMethod ? (
												<span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
													<span
														aria-hidden
														className="absolute inset-0 rounded-full bg-green-200 opacity-50"
													></span>
													<span className="relative">
														{custommerAddress.address.deliveryMethod?.toUpperCase()}
													</span>
												</span>
											) : (
												<p>-</p>
											)}
										</td>
										<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
											{paymentMethod ? (
												<p className="whitespace-no-wrap text-gray-900">
													{paymentMethod}
												</p>
											) : (
												<p>-</p>
											)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 self-end">
							<p className="text-xl">Razem do zapłaty:</p>
							<p className="text-xl font-semibold">{formatMoney(totalPrice)}</p>
						</div>
						<Button
							type="button"
							className="w-full max-w-xs self-end"
							onClick={onSubmitOrder}
						>
							{loading ? "Ładowanie..." : "Złóż zamówienie"}
						</Button>
					</div>
				</div>
			)}
		</>
	);
};
