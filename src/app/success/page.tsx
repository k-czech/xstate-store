import { Section } from "@/components/Section";
import { Check } from "lucide-react";
import NextLink from "next/link";
import { redirect } from "next/navigation";

export default function Success({
	searchParams,
}: {
	searchParams: { session_id?: string };
}) {
	if (!searchParams.session_id) {
		redirect("/");
	}
	return (
		<Section>
			<div className="flex flex-col items-center justify-center space-y-5 text-center">
				<div className="flex max-w-md flex-col items-center space-y-6">
					<div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-primary text-white">
						<Check size={48} />
					</div>
					<div className="text-center">
						<h1 className="text-3xl font-semibold">Zamówienie potwierdzone</h1>
						<p className="mt-2">
							Bardzo dziękujemy za zaufanie i Twoje zamówienie w naszym sklepie.
						</p>
						<p className="mt-6">
							Zakasamy rękawy i zabieramy się za produkcję Twojego zamówienia.
							Zrobimy co w naszej mocy by Twoja paczka od nas dotarła do Ciebie
							jak najszybciej.
						</p>
					</div>
					<NextLink
						href="/"
						className="inline-flex w-full max-w-xs items-center justify-center whitespace-nowrap rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					>
						Kupuj dalej
					</NextLink>
				</div>
			</div>
		</Section>
	);
}
