import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ModalProvider } from "@/contexts/ModalProvider";
import { Toaster } from "@/components/ui/toaster";
import { ProductsProvider } from "@/contexts/ProductsProvider";

const lato = Lato({ subsets: ["latin-ext"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "CorazLepszaFirma.pl - system zakupowy",
	description: "CorazLepszaFirma.pl - system zakupowy dla rozwojowców",
	openGraph: {
		locale: "pl_PL",
		siteName: "CorazLepszaFirma.pl",
		alternateLocale: "en_GB",
		title: "CorazLepszaFirma.pl - system zakupowy",
		description: "CorazLepszaFirma.pl - system zakupowy dla rozwojowców",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl-PL">
			<body className={lato.className}>
				<ModalProvider>
					<ProductsProvider>
						<Header />
						<main>{children}</main>
						<Toaster />
					</ProductsProvider>
				</ModalProvider>
			</body>
		</html>
	);
}
