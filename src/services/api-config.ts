export const executeApi = async ({ dummyData }: { dummyData: unknown }) => {
	if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
		throw TypeError("API_BASE_URL is not defined");
	}

	const body = JSON.stringify(dummyData);

	const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL, {
		method: "POST",
		body,
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = (await response.json()) as {
		error: string | null;
		message: string | null;
		id: string;
	};

	if (data.error) {
		throw new Error(data.error);
	}

	return data;
};
