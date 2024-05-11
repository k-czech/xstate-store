import { AddProductForm } from "@/components/AddProductForm";
import { Modal } from "@/components/Modal";
import { Products } from "@/components/Products";
import { Section } from "@/components/Section";

export default function Home() {
	return (
		<>
			<Section>
				<Products />
			</Section>
			<Modal
				title="Formularz dodawania produktu"
				description="Dodaj produkt z nazwą, ceną oraz określ czy produkt wymaga wysyłki"
			>
				<AddProductForm />
			</Modal>
		</>
	);
}
