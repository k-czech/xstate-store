"use client";

import { Button } from "@/components/ui/button";
import { useModalContext } from "@/contexts/ModalProvider";
import { ShoppingBag } from "lucide-react";
import NextImage from "next/image";
import { CartBadge } from "./CartBadge";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
export const Header = () => {
	const { setModalOpen } = useModalContext();
	const router = useRouter();

	return (
		<header className="bg-primary shadow">
			<div className="container mx-auto flex h-20 flex-row items-center justify-between">
				<NextLink href="/">
					<NextImage
						src="/images/logo_clf_dark.png"
						alt="CorazLepszaFirma.pl"
						width={0}
						height={0}
						sizes="100vw"
						className="h-auto w-[240px] brightness-0 invert"
						priority
					/>
				</NextLink>
				<div className="flex flex-row items-center">
					<Button
						className="bg-white text-black duration-500 hover:bg-slate-500 hover:text-white"
						onClick={() => setModalOpen(true)}
					>
						Dodaj produkty
					</Button>
					<Button
						type="button"
						className="relative p-0"
						onClick={() => router.push("/cart")}
					>
						<ShoppingBag className="ml-4 h-6 w-6 text-white" />
						<CartBadge />
					</Button>
				</div>
			</div>
		</header>
	);
};
