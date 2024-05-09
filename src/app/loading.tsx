import { cn } from "@/lib/utils";

export default async function Loading() {
	return (
		<div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
			<div
				className={cn(
					"h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent",
				)}
			></div>
		</div>
	);
}
