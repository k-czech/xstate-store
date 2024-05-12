"use client";

import { LOCAL_STORAGE_PAYMENT_KEY } from "@/constants/local-storage";
import { StateContextProps } from "@/interfaces";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type PaymentService = {
	paymentMethod: string;
	setPaymentMethod: Dispatch<SetStateAction<string>>;
	removePaymentMethod: () => void;
};

const PaymentContext = createContext<PaymentService>({
	paymentMethod: "",
	setPaymentMethod: () => {},
	removePaymentMethod: () => {},
});

export const PaymentProvider = ({ children }: StateContextProps) => {
	const [paymentMethod, setPaymentMethod] = useState("");

	useEffect(() => {
		const savedPaymentMethod = localStorage.getItem(LOCAL_STORAGE_PAYMENT_KEY);
		if (savedPaymentMethod) {
			setPaymentMethod(savedPaymentMethod);
		}
	}, []);

	useEffect(() => {
		if (paymentMethod !== "") {
			localStorage.setItem(LOCAL_STORAGE_PAYMENT_KEY, paymentMethod);
		}
	}, [paymentMethod]);

	const removePaymentMethod = () => {
		localStorage.removeItem(LOCAL_STORAGE_PAYMENT_KEY);
		setPaymentMethod("");
	};

	return (
		<PaymentContext.Provider
			value={{ paymentMethod, setPaymentMethod, removePaymentMethod }}
		>
			{children}
		</PaymentContext.Provider>
	);
};

export const usePayment = () => {
	const context = useContext(PaymentContext);
	return context;
};
