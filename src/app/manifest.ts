import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "CorazLepszaFirma.pl - sklep internetowy",
		short_name: "CorazLepszaFirma.pl",
		description: "CorazLepszaFirma.pl - sklep internetowy dla rozwojowców",
		start_url: "/",
		display: "standalone",
		background_color: "#FFFFFF",
		theme_color: "#45388f",
		icons: [
			{
				src: "/images/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/images/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
