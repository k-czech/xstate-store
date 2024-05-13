"use client";

import { useProducts } from "@/contexts/ProductsProvider";
import { formatMoney } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { Loader } from "./Loader";
import { useToast } from "./ui/use-toast";
import { useCart } from "@/contexts/CartProvider";

export const Products = () => {
	const {
		state: { products, loading },
	} = useProducts();
	const { toast } = useToast();
	const { getOrCreateCart, addProduct, updateProduct, state } = useCart();

	const addProductToCart = (formData: FormData) => {
		const productId = formData.get("productId");
		const productName = formData.get("productName");
		const productPrice = formData.get("productPrice");
		const productRequiresShipping =
			formData.get("productRequiresShipping") === "true";

		if (!productId) {
			throw new Error("Nie znaleziono produktu");
		}

		const cart = getOrCreateCart();

		if (!cart) {
			throw TypeError("Nie znaleziono koszyka");
		}

		const productAvailableInCart = state.cartProducts.products?.find(
			(product) => product.id === productId,
		);
		if (productAvailableInCart) {
			updateProduct({
				id: String(productId),
				name: String(productName),
				price: String(productPrice),
				requiresShipping: Boolean(productRequiresShipping),
				quantity: Number(productAvailableInCart.quantity) + 1,
			});
			return;
		}

		addProduct(cart, {
			id: String(productId),
			name: String(productName),
			price: String(productPrice),
			requiresShipping: Boolean(productRequiresShipping),
			quantity: 1,
		});

		toast({
			title: "Produkt został dodany do koszyka",
			className: "bg-secondary border-border border-secondary text-slate50",
		});
	};

	if (loading) return <Loader />;

	return products.length > 0 ? (
		<div className="flex flex-col gap-4">
			{products.map((product) => (
				<div key={product.id} className="flex flex-col gap-2">
					<p>
						{product.name} - {formatMoney(Number(product.price))}
					</p>
					<form action={addProductToCart}>
						<input type="hidden" name="productId" value={product.id} />
						<input type="hidden" name="productName" value={product.name} />
						<input type="hidden" name="productPrice" value={product.price} />
						<input
							type="hidden"
							name="productRequiresShipping"
							value={product.requiresShipping ? "true" : "false"}
						/>
						<AddToCartButton />
					</form>
				</div>
			))}
		</div>
	) : (
		<p>Brak produktów</p>
	);
};
