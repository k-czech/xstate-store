"use client";

import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/contexts/ModalProvider";
export const Header = () => {
	const { setModalOpen } = useModalContext();

	return (
		<header className="bg-primary shadow">
			<div className="container mx-auto flex h-20 flex-row items-center justify-between">
				<NextImage
					src="/images/logo_clf_dark.png"
					alt="CorazLepszaFirma.pl"
					width={0}
					height={0}
					sizes="100vw"
					className="h-auto w-[240px] brightness-0 invert"
					priority
				/>
				<Button
					className="bg-white text-black duration-500 hover:bg-slate-500 hover:text-white"
					onClick={() => setModalOpen(true)}
				>
					Dodaj produkty
				</Button>
			</div>
		</header>
	);
};
