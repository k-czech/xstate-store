import { BackButton } from "@/components/BackButton";
import { PaymentForm } from "@/components/PaymentForm";
import { Section } from "@/components/Section";

export default function Payment() {
	return (
		<Section className="flex flex-col gap-4">
			<PaymentForm />
			<BackButton />
		</Section>
	);
}
