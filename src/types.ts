export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

export enum HTTP {
	POST = "POST",
	GET = "GET",
	PATCH = "PATCH",
	DELETE = "DELETE",
	PUT = "PUT",
}

export enum UNITS {
	CELCIUS = "metric",
	FAHRENHEIT = "imperial",
}

export type FetchResponse<T = Record<string, unknown>> = {
	data: T | null;
	message?: string;
	error?: string;
	success?: boolean;
	statusCode?: number;
};

export type AddFavoriteAction = {
	type: typeof REDUCER_TYPES.ADD_FAVORITE;
	payload: { favorite: InitialState["weatherData"] };
};

export type RemoveFavoriteAction = {
	type: typeof REDUCER_TYPES.REMOVE_FAVORITE;
	payload: { favorite: InitialState["weatherData"] };
};

export type FetchWeatherRequestAction = {
	type: typeof REDUCER_TYPES.FETCH_WEATHER_REQUEST;
};

export type FetchWeatherSuccessAction = {
	type: typeof REDUCER_TYPES.FETCH_WEATHER_SUCCESS;
	payload: { unit: UNITS; weatherData: InitialState["weatherData"] };
};

export type FetchWeatherFailureAction = {
	type: typeof REDUCER_TYPES.FETCH_WEATHER_FAILURE;
	payload: { error: string };
};

export type WeatherActions =
	| AddFavoriteAction
	| RemoveFavoriteAction
	| FetchWeatherRequestAction
	| FetchWeatherSuccessAction
	| FetchWeatherFailureAction;

export enum REDUCER_TYPES {
	FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST",
	FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS",
	FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE",
	ADD_FAVORITE = "ADD_FAVORITE",
	REMOVE_FAVORITE = "REMOVE_FAVORITE",
}

export interface InitialState {
	loading: boolean;
	error?: string;
	weatherData: WeatherData;
	favorites: WeatherData[];
}

export interface Action {
	type: REDUCER_TYPES;
	payload: {
		weatherData?: WeatherData;
		error?: string;
		unit: UNITS;
	};
}

export type WeatherData = {
	coord: {
		lon: number;
		lat: number;
	};
    unit: UNITS;
    uvi: number;
	weather: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	base?: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level?: number;
		grnd_level?: number;
	};
	visibility?: number;
	wind: {
		speed: number;
		deg: number;
		gust?: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type?: number;
		id?: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

export interface WeatherMetricProps {
	icon?: string | React.ReactNode;
	title?: string;
	value?: React.ReactNode;
	loading?: boolean;
}

export interface HighLightCardProps {
	title: string;
	value: string;
	image: string;
}

export type OneCallWeatherData = {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: {
		dt: number;
		sunrise: number;
		sunset: number;
		temp: number;
		feels_like: number;
		pressure: number;
		humidity: number;
		dew_point: number;
		uvi: number;
		clouds: number;
		visibility: number;
		wind_speed: number;
		wind_deg: number;
		wind_gust: number;
		weather: Array<{
			id: number;
			main: string;
			description: string;
			icon: string;
		}>;
	};
};
