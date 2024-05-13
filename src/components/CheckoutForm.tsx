"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCart } from "@/contexts/CartProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddAddressForm, FormSchema } from "./AddAddressForm";
import { Loader } from "./Loader";
import { useCustommerAddress } from "@/contexts/AddressProvider";
import { useRouter } from "next/navigation";
import { BackButton } from "./BackButton";

export const CheckoutForm = () => {
	const router = useRouter();
	const { state } = useCart();
	const { addAddress } = useCustommerAddress();
	const [deliveryCountry, setDeliveryCountry] = useState<string>("");

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			street: "",
			city: "",
			country: "",
			deliveryMethod: "",
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		addAddress({
			street: data.street,
			city: data.city,
			country: data.country,
			deliveryMethod: data.deliveryMethod,
		});
		setDeliveryCountry("");
		form.reset();
		router.push("/payment");
	};

	return state.loading ? (
		<Loader />
	) : (
		<div className="flex flex-col gap-4">
			<div className="mt-2 flex flex-col gap-4">
				<h3 className="text-xl font-semibold">Dane do wysyłki</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
						{state.cartProducts.products.map((product) => {
							return (
								<AddAddressForm
									key={product.id}
									form={form}
									requiresShipping={product.requiresShipping}
									deliveryCountry={deliveryCountry}
									setDeliveryCountry={setDeliveryCountry}
								/>
							);
						})}
						<Button type="submit" className="w-full max-w-xs text-white">
							Przejdź do płatności
						</Button>
					</form>
				</Form>
				<BackButton />
			</div>
		</div>
	);
};
