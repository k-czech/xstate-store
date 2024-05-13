"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const status = useFormStatus();

	return (
		<Button
			type="submit"
			className="w-full max-w-xs disabled:bg-slate-200"
			disabled={status.pending}
		>
			{status.pending ? "Dodawanie..." : "Dodaj do koszyka"}
		</Button>
	);
};
