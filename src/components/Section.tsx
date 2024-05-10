import { ReactNode } from "react";

export const Section = ({ children }: { children: ReactNode }) => {
	return (
		<section className="desktop:py-[6.25rem] container mx-auto py-[3.125rem]">
			{children}
		</section>
	);
};
