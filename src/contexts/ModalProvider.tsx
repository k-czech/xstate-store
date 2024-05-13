"use client";

import { StateContextProps } from "@/interfaces";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ModalService = {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalService>({
	modalOpen: false,
	setModalOpen: () => {},
});

export const ModalProvider = ({ children }: StateContextProps) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<ModalContext.Provider value={{ modalOpen, setModalOpen }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModalContext = () => {
	const context = useContext(ModalContext);
	return context;
};
