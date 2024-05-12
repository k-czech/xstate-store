import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = { className?: string; children: ReactNode };

export const Section = ({ className, children }: SectionProps) => {
	return (
		<section
			className={cn(
				"desktop:py-[6.25rem] container mx-auto py-[3.125rem]",
				className,
			)}
		>
			{children}
		</section>
	);
};
