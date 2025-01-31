import defaultImage from "@/assets/weather-image.png";
import WeatherCard from "./weather-card";
import { Skeleton } from "./skeleton";
import { useWeather } from "@/providers/weather-provider";
import { WeatherMetric } from "./metric";
import {
	getWeatherIconUrl,
	getWindSpeedAndDirection,
} from "@/lib/helper-functions";
import { HighLightCardProps } from "@/types";
import HighLightCard from "./highlight-card";
import uvIndexImage from "@/assets/uv-image.png";
import sunriseImage from "@/assets/sunrise.png";
import sunsetImage from "@/assets/sunset.png";
import HumidityIcon from "@/icons/humidity-icon";
import WindIcon from "@/icons/wind-icon";

function MainBody() {
	const { state } = useWeather();

	const { speed, direction } = getWindSpeedAndDirection(
		state.weatherData.wind.speed,
		state.weatherData.wind.deg,
		state.weatherData.unit
	);

	const highLights: HighLightCardProps[] = [
		{
			title: "UV index",
			image: uvIndexImage,
			value: `${state.weatherData.uvi}`,
		},
		{
			title: "Sunrise",
			image: sunriseImage,
			value: `${new Date(
				state.weatherData.sys.sunrise * 1000
			).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})}`,
		},
		{
			title: "Sunset",
			image: sunsetImage,
			value: `${new Date(
				state.weatherData.sys.sunset * 1000
			).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})}`,
		},
	];

	return (
		<section className="flex-1 p-4 h-[calc(100vh-85px)] overflow-y-auto">
			{state.loading ? (
				<Skeleton className="h-10 w-3/4 mb-3" />
			) : (
				<div className="flex items-center gap-x-4 mb-3">
					<h1 className="text-[32px] font-bold leading-10 ">
						Weather in {state?.weatherData?.name}{" "}
					</h1>
					<img
						className="size-14"
						src={getWeatherIconUrl(state.weatherData.weather?.[0].icon)}
						alt={`Weather icon for ${state.weatherData.name}`}
					/>
				</div>
			)}
			<span className="!text-[#637D87] text-sm leading-[21px]">
				Today ·{" "}
				{new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</span>
			<p className="mt-8 text-lg font-bold leading-[23px]">
				Current Conditions
			</p>

			<div className="px-0 lg:px-4 py-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
				<img src={defaultImage} />
				<WeatherCard />
			</div>

			<div className="px-0 lg:p-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
				<WeatherMetric
					icon={<HumidityIcon />}
					title="Humidity"
					value={`${state.weatherData.main.humidity}%`}
					loading={state.loading}
				/>

				<WeatherMetric
					icon={<WindIcon />}
					title="Wind"
					value={`${speed} from the ${direction}`}
					loading={state.loading}
				/>
			</div>

			<h2 className="font-bold text-lg leading-5 p-4 pb-2">
				Today's Highlights
			</h2>

			<div className="px-0 lg:p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
				{highLights.map((highlight) => (
					<HighLightCard key={highlight.title} {...highlight} />
				))}
			</div>
		</section>
	);
}

export default MainBody;
