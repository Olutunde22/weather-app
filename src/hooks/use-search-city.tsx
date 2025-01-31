import { useCallback } from "react";
import {
	WeatherData,
	UNITS,
	HTTP,
	FetchWeatherRequestAction,
	REDUCER_TYPES,
	FetchWeatherFailureAction,
	OneCallWeatherData,
} from "../types";
import { fetcher } from "@/services/api-client";
import { useWeather } from "@/providers/weather-provider";
import { toast } from "sonner";

const useSearchCity = () => {
	const { dispatch } = useWeather();

	const handleSearchCity = useCallback(
		async (search: string, unit: UNITS) => {
			if (search.length <= 2) {
				toast.info(
					search.length === 0
						? "Please enter a city name"
						: "Please enter at least 3 characters"
				);
				return;
			}

			dispatch({
				type: REDUCER_TYPES.FETCH_WEATHER_REQUEST,
				payload: { unit },
			} as FetchWeatherRequestAction);

			try {
				// weather api does not return uvi
				const initialResponse = await fetcher<WeatherData>(
					`/data/2.5/weather?q=${search}&units=${unit}`,
					HTTP.GET
				);

				if (!initialResponse.success || !initialResponse.data) {
					throw new Error(initialResponse.error);
				}

				// onecall returns the uvi but can only be called with longitude and latitude
				const response = await fetcher<OneCallWeatherData>(
					`/data/3.0/onecall?lat=${initialResponse.data.coord.lat}&lon=${initialResponse.data.coord.lon}&exclude=alerts,minutely,hourly,daily&units=${unit}`,
					HTTP.GET
				);

				if (!response.success || !response.data) {
					throw new Error(response.error);
				}

				dispatch({
					type: REDUCER_TYPES.FETCH_WEATHER_SUCCESS,
					payload: {
						unit,
						weatherData: {
							...initialResponse.data,
							uvi: response.data.current.uvi,
						},
					},
				});
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				toast.error(error.message);
				dispatch({
					type: REDUCER_TYPES.FETCH_WEATHER_FAILURE,
					payload: { error: error.message },
				} as FetchWeatherFailureAction);
			}
		},
		[dispatch]
	);

	return { handleSearchCity };
};

export default useSearchCity;
