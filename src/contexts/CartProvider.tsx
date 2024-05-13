"use client";
import {
	LOCAL_STORAGE_CART_ID_KEY,
	LOCAL_STORAGE_CART_PRODUCTS_KEY,
} from "@/constants/local-storage";
import { Product, StateContextProps } from "@/interfaces";
import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";

type CartProducts = {
	cartId: string;
	products: Product[];
};

type CartState = {
	cartProducts: CartProducts;
	loading: boolean;
};

type AddCartProductAction =
	| { type: "SET_LOADING"; loading: boolean }
	| { type: "LOAD_PRODUCTS"; cartProducts: CartProducts }
	| { type: "ADD_PRODUCT"; cartId: string; product: Product }
	| { type: "UPDATE_PRODUCT"; product: Product }
	| { type: "REMOVE_PRODUCT"; product: Product };

type CartAction = AddCartProductAction;

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		case "LOAD_PRODUCTS":
			return {
				...state,
				cartProducts: action.cartProducts,
				loading: false,
			};
		case "ADD_PRODUCT":
			return {
				...state,
				cartProducts: {
					cartId: action.cartId,
					products: [...state.cartProducts.products, action.product],
				},
			};
		case "UPDATE_PRODUCT":
			return {
				...state,
				cartProducts: {
					cartId: state.cartProducts.cartId,
					products: state.cartProducts.products.map((product) =>
						product.id === action.product.id ? action.product : product,
					),
				},
			};
		case "REMOVE_PRODUCT":
			return {
				...state,
				cartProducts: {
					cartId: state.cartProducts.cartId,
					products: state.cartProducts.products.filter(
						(product) => product.id !== action.product.id,
					),
				},
			};
		default:
			return state;
	}
};

const CartContext = createContext<{
	state: CartState;
	getOrCreateCart: () => string | undefined;
	addProduct: (cartId: string, product: Product) => void;
	updateProduct: (product: Product) => void;
	removeProduct: (product: Product) => void;
	totalPrice: number;
	removeCart: () => void;
}>({
	state: {
		cartProducts: {
			cartId: "",
			products: [],
		},
		loading: false,
	},
	getOrCreateCart: () => "",
	addProduct: () => {},
	updateProduct: () => {},
	removeProduct: () => {},
	totalPrice: 0,
	removeCart: () => {},
});

export const initialCartState: CartState = {
	cartProducts: {
		cartId: "",
		products: [],
	},
	loading: true,
};

export const CartProvider = ({ children }: StateContextProps) => {
	const [state, dispatch] = useReducer(cartReducer, initialCartState);

	useEffect(() => {
		const savedCartProducts = localStorage.getItem(
			LOCAL_STORAGE_CART_PRODUCTS_KEY,
		);

		const cartProducts = savedCartProducts ? JSON.parse(savedCartProducts) : [];
		dispatch({ type: "LOAD_PRODUCTS", cartProducts });
		dispatch({ type: "SET_LOADING", loading: false });
	}, []);

	const getOrCreateCart = () => {
		if (typeof window !== "undefined") {
			const cartId = localStorage.getItem(LOCAL_STORAGE_CART_ID_KEY);
			if (cartId) {
				const cart = getCartById(cartId);
				if (cart) {
					return cart;
				}
			}
		}
		const cartId = createCart();
		if (!cartId) {
			throw new Error("Nie można utworzyć koszyka");
		}
		localStorage.setItem(LOCAL_STORAGE_CART_ID_KEY, cartId);

		return cartId;
	};

	const getCartById = (cartId: string) => {
		return cartId;
	};

	const createCart = () => {
		return uuidv4();
	};

	const addProduct = (cartId: string, product: Product) => {
		dispatch({ type: "ADD_PRODUCT", cartId, product });
	};

	const updateProduct = (product: Product) => {
		dispatch({ type: "UPDATE_PRODUCT", product });
	};

	const removeProduct = (product: Product) => {
		dispatch({ type: "REMOVE_PRODUCT", product });
	};

	const totalPrice = useMemo(() => {
		return state.cartProducts?.products?.reduce((acc, product) => {
			return acc + Number(product.price) * Number(product.quantity);
		}, 0);
	}, [state.cartProducts.products]);

	const removeCart = () => {
		localStorage.removeItem(LOCAL_STORAGE_CART_ID_KEY);
		localStorage.removeItem(LOCAL_STORAGE_CART_PRODUCTS_KEY);

		dispatch({
			type: "LOAD_PRODUCTS",
			cartProducts: initialCartState.cartProducts,
		});
	};

	useEffect(() => {
		const cartId = getOrCreateCart();
		if (state.cartProducts.cartId === cartId) {
			localStorage.setItem(
				LOCAL_STORAGE_CART_PRODUCTS_KEY,
				JSON.stringify(state.cartProducts),
			);
		}
	}, [state.cartProducts.products]);

	return (
		<CartContext.Provider
			value={{
				state,
				getOrCreateCart,
				addProduct,
				updateProduct,
				removeProduct,
				totalPrice,
				removeCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
