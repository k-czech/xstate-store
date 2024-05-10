import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatMoney(amount: number, currency = "PLN") {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency,
	}).format(amount);
}
