import { CheckoutForm } from "@/components/CheckoutForm";
import { Section } from "@/components/Section";
import { v4 as uuidv4 } from "uuid";

export default function Checkout() {
	return (
		<Section>
			<h1 className="text-2xl font-semibold leading-tight">
				Zamówienie numer: {uuidv4()}
			</h1>
			<CheckoutForm />
		</Section>
	);
}
