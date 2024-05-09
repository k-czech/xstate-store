import NextLink from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
			<div className="max-w-4xl space-y-8 text-center">
				<h1 className="text-9xl font-normal leading-none text-gray-600">404</h1>

				<p className="text-xl text-gray-400">Oops, nie odnaleziono strony.</p>
			</div>
			<p className="text-gray-600">
				Przejdź do{" "}
				<NextLink className="text-primary underline" href={"/"}>
					strony głównej
				</NextLink>{" "}
				lub skontaktuj się z administratorem
			</p>
		</div>
	);
}
