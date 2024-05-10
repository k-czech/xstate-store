"use client";

import { AddProductForm } from "@/components/AddProductForm";
import { Loader } from "@/components/Loader";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModalContext } from "@/contexts/ModalProvider";
import { useProducts } from "@/contexts/ProductsProvider";
import { formatMoney } from "@/lib/utils";

export default function Home() {
	const { modalOpen, setModalOpen } = useModalContext();
	const {
		state: { products, loading },
	} = useProducts();

	if (loading) return <Loader />;

	return (
		<>
			<Section>
				{products.length > 0 ? (
					<div className="flex flex-col gap-4">
						{products.map((product: any) => (
							<div key={product.name} className="flex flex-col gap-2">
								<p>
									{product.name} - {formatMoney(product.price)}
								</p>
								<Button className="w-full max-w-xs">Dodaj do koszyka</Button>
							</div>
						))}
					</div>
				) : (
					<p>Brak produktów</p>
				)}
			</Section>
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Formularz dodawania produktu</DialogTitle>
						<DialogDescription>
							Dodaj produkt z nazwą, ceną oraz określ czy produkt wymaga wysyłki
						</DialogDescription>
					</DialogHeader>
					<AddProductForm />
				</DialogContent>
			</Dialog>
		</>
	);
}
