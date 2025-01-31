import { getErrorMessage } from "@/lib/helper-functions";
import { FetchResponse, HTTP } from "@/types";

export async function fetcher<T>(
	url: string,
	method: HTTP,
	errorMessage: string = "Oops! Something went wrong"
): Promise<FetchResponse<T>> {
	try {
		const path = url.startsWith("/") ? url : `/${url}`;

		const response = await fetch(
			`${import.meta.env.VITE_WEATHER_BASE_URL}${path}&appid=${
				import.meta.env.VITE_WEATHER_API_KEY
			}`,
			{
				method: method ?? HTTP.GET,
			}
		);

		if (!response.ok) {
			let errorData: {
				message: string;
				statusCode?: number;
			} = {
				message: errorMessage,
			};

			errorData = await response.json();

			throw {
				message: errorData?.message || errorMessage,
				statusCode: errorData?.statusCode,
			};
		}

		const data = await response.json();

		return {
			data: data,
			statusCode: response.status,
			message: data?.message ?? "Success",
			success: true,
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return {
			data: null,
			statusCode: error.statusCode,
			error: getErrorMessage(error, { message: errorMessage }),
		};
	}
}
