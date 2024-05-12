"use client";

import { LOCAL_STORAGE_ADDRESS_KEY } from "@/constants/local-storage";
import { StateContextProps } from "@/interfaces";
import { createContext, useContext, useEffect, useReducer } from "react";

type Address = {
	street: string;
	city: string;
	country: string;
	deliveryMethod: string;
};

type AddressState = {
	address: Address;
	loading: boolean;
};

type AddAddressAction =
	| { type: "SET_LOADING"; loading: boolean }
	| { type: "LOAD_ADDRESS"; address: Address }
	| { type: "ADD_ADDRESS"; address: Address };

type AddressAction = AddAddressAction;

const addressReducer = (
	state: AddressState,
	action: AddressAction,
): AddressState => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		case "LOAD_ADDRESS":
			return {
				...state,
				address: action.address,
				loading: false,
			};
		case "ADD_ADDRESS":
			return {
				...state,
				address: action.address,
			};
		default:
			return state;
	}
};

const CustomerAddressContext = createContext<{
	state: AddressState;
	addAddress: (address: Address) => void;
	removeAddress: () => void;
}>({
	state: {
		address: {
			street: "",
			city: "",
			country: "",
			deliveryMethod: "",
		},
		loading: true,
	},
	addAddress: () => {},
	removeAddress: () => {},
});

const initialState: AddressState = {
	address: {
		street: "",
		city: "",
		country: "",
		deliveryMethod: "",
	},
	loading: true,
};
export const CustomerAddressProvider = ({ children }: StateContextProps) => {
	const [state, dispatch] = useReducer(addressReducer, initialState);

	useEffect(() => {
		const savedAddress = localStorage.getItem(LOCAL_STORAGE_ADDRESS_KEY);
		const address = savedAddress ? JSON.parse(savedAddress) : {};
		dispatch({ type: "LOAD_ADDRESS", address });
		dispatch({ type: "SET_LOADING", loading: false });
	}, []);

	useEffect(() => {
		if (state.address.city !== "" || state.address.street !== "") {
			localStorage.setItem(
				LOCAL_STORAGE_ADDRESS_KEY,
				JSON.stringify(state.address),
			);
		}
	}, [state]);

	const addAddress = (address: Address) => {
		dispatch({ type: "ADD_ADDRESS", address });
	};

	const removeAddress = () => {
		localStorage.removeItem(LOCAL_STORAGE_ADDRESS_KEY);
		dispatch({ type: "ADD_ADDRESS", address: initialState.address });
	};
	return (
		<CustomerAddressContext.Provider
			value={{ state, addAddress, removeAddress }}
		>
			{children}
		</CustomerAddressContext.Provider>
	);
};

export const useCustommerAddress = () => useContext(CustomerAddressContext);
