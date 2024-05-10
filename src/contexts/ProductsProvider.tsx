"use client";

import { LOCAL_STORAGE_PORDUCTS_KEY } from "@/constants/local-storage";
import { StateContextProps } from "@/interfaces";
import { createContext, useContext, useEffect, useReducer } from "react";

type Product = {
	id: string;
	name: string;
	price: string;
	requiresShipping?: boolean;
};

type ProductState = {
	products: Product[];
	loading: boolean;
	message: string;
};

type AddProductAction =
	| { type: "SET_LOADING"; loading: boolean }
	| { type: "LOAD_PRODUCTS"; products: Product[] }
	| { type: "ADD_PRODUCT"; product: Product }
	| { type: "SET_MESSAGE"; message: string };

type ProductAction = AddProductAction;

const productReducer = (
	state: ProductState,
	action: ProductAction,
): ProductState => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		case "LOAD_PRODUCTS":
			return {
				...state,
				products: action.products,
				loading: false,
				message: action.products.length ? "" : "Brak produktów",
			};
		case "ADD_PRODUCT":
			return {
				...state,
				products: [...state.products, action.product],
				message: "",
			};
		case "SET_MESSAGE":
			return { ...state, message: action.message };
		default:
			return state;
	}
};

const ProductsContext = createContext<{
	state: ProductState;
	addProduct: (product: Product) => void;
}>({
	state: {
		products: [],
		loading: false,
		message: "",
	},
	addProduct: () => {},
});

const initialState: ProductState = {
	products: [],
	loading: true,
	message: "",
};
export const ProductsProvider = ({ children }: StateContextProps) => {
	const [state, dispatch] = useReducer(productReducer, initialState);

	useEffect(() => {
		const savedProducts = localStorage.getItem(LOCAL_STORAGE_PORDUCTS_KEY);
		const products = savedProducts ? JSON.parse(savedProducts) : [];
		dispatch({ type: "LOAD_PRODUCTS", products });
		dispatch({ type: "SET_LOADING", loading: false });
	}, []);

	useEffect(() => {
		if (state.products.length > 0) {
			localStorage.setItem(
				LOCAL_STORAGE_PORDUCTS_KEY,
				JSON.stringify(state.products),
			);
		}
	}, [state.products]);

	const addProduct = (product: Product) => {
		dispatch({ type: "ADD_PRODUCT", product });
	};
	return (
		<ProductsContext.Provider value={{ state, addProduct }}>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProducts = () => useContext(ProductsContext);
