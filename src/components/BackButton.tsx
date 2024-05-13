"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
	const router = useRouter();
	return (
		<Button
			type="button"
			className="w-full max-w-xs bg-slate-500 text-white"
			onClick={() => router.back()}
		>
			Wróć
		</Button>
	);
};
