import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";

// Route segment config
export const runtime = "edge";

export const alt = "Chcesz mieć firmę, z której będziesz dumny?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const backdropStyle: CSSProperties | undefined = {
	background: "#1CA6D9",
	width: "100%",
	height: "100%",
	position: "absolute",
	top: 0,
	right: 0,
	display: "flex",

	opacity: 0.5,
};

const style: CSSProperties | undefined = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	fontSize: "3rem",
	background:
		"radial-gradient(123.65% 123.65% at 16.11% 18.28%, #34B5E5 21.3%, #007bff 100%)",
	color: "#fff",
	width: "100%",
	height: "100%",
	textAlign: "center",
	position: "relative",
};

export default async function Image() {
	const messageDecoded = decodeURIComponent(alt);
	const openSansBold = fetch(
		new URL("./OpenSans-Bold.ttf", import.meta.url),
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		(
			<div style={style}>
				<div style={backdropStyle} />
				<p>{messageDecoded}</p>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: "OpenSans",
					data: await openSansBold,
					style: "normal",
					weight: 700,
				},
			],
		},
	);
}
