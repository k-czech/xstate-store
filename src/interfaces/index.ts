import { ReactNode } from "react";

export type StateContextProps = {
	children: ReactNode;
};

export type Product = {
	id: string;
	name: string;
	price: string;
	requiresShipping?: boolean;
	quantity?: number;
};
