"use client";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { useModalContext } from "@/contexts/ModalProvider";
import { ReactNode } from "react";

type ModalProps = {
	title: string;
	description: string;
	children: ReactNode;
};

export const Modal = ({ title, description, children }: ModalProps) => {
	const { modalOpen, setModalOpen } = useModalContext();
	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
