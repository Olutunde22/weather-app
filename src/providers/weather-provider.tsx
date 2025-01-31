/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { InitialState, REDUCER_TYPES, UNITS, WeatherActions } from "@/types";

const WeatherContext = createContext<
	| {
			state: InitialState;
			dispatch: React.Dispatch<WeatherActions>;
	  }
	| undefined
>(undefined);

const createInitialWeatherData = (): InitialState => ({
	loading: false,
	error: "",
	weatherData: {
		coord: { lon: -0.1257, lat: 51.5085 },
		weather: [
			{ id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
		],
		unit: UNITS.CELCIUS,
		base: "stations",
		uvi: 0,
		main: {
			temp: 5.54,
			feels_like: 3.48,
			temp_min: 3.98,
			temp_max: 6.25,
			pressure: 1025,
			humidity: 77,
			sea_level: 1025,
			grnd_level: 1020,
		},
		visibility: 10000,
		wind: { speed: 2.57, deg: 270 },
		clouds: { all: 14 },
		dt: 1738258996,
		sys: {
			type: 2,
			id: 2091269,
			country: "GB",
			sunrise: 1738222905,
			sunset: 1738255543,
		},
		timezone: 0,
		id: 2643743,
		name: "London",
		cod: 200,
	},
	favorites: [],
});

function weatherReducer(
	state: InitialState,
	action: WeatherActions
): InitialState {
	switch (action.type) {
		case REDUCER_TYPES.ADD_FAVORITE:
			if (
				state.favorites.some(
					(favorite) => favorite.id === action.payload.favorite.id
				)
			) {
				return state;
			}
			return {
				...state,
				favorites: [...state.favorites, action.payload.favorite],
			};
		case REDUCER_TYPES.REMOVE_FAVORITE:
			return {
				...state,
				favorites: state.favorites.filter(
					(favorite) => favorite.id !== action.payload.favorite.id
				),
			};
		case REDUCER_TYPES.FETCH_WEATHER_REQUEST:
			return { ...state, loading: true, error: "" };
		case REDUCER_TYPES.FETCH_WEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				weatherData: {
					...state.weatherData,
					...action.payload.weatherData,
					unit: action.payload.unit,
				},
			};
		case REDUCER_TYPES.FETCH_WEATHER_FAILURE:
			return { ...state, loading: false, error: action.payload.error };
		default:
			return state;
	}
}

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(
		weatherReducer,
		createInitialWeatherData()
	);

	return (
		<WeatherContext.Provider value={{ state, dispatch }}>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeather = () => {
	const context = useContext(WeatherContext);
	if (context === undefined) {
		throw new Error("useWeather must be used within a WeatherProvider");
	}
	return context;
};
