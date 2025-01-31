import { useState } from "react";
import Button from "./button";
import { BiSearch } from "react-icons/bi";
import { UNITS } from "@/types";
import { Skeleton } from "./skeleton";
import { useWeather } from "@/providers/weather-provider";
import Input from "./input";
import { cn } from "@/lib/helper-functions";
import useSearchCity from "@/hooks/use-search-city";

function WeatherCard() {
	const { state } = useWeather();
	const { weatherData, loading } = state;
	const [searchQuery, setSearchQuery] = useState(weatherData.name);
	const [stateUnit, setUnit] = useState(UNITS.CELCIUS);
	const { handleSearchCity } = useSearchCity();

	return (
		<div className="w-full flex justify-center">
			<div className="flex w-full max-w-[400px] flex-col h-full justify-between min-h-[268px]">
				{/* Temperature and Condition */}
				<div className="text-center space-y-2">
					{loading ? (
						<Skeleton className="h-10 w-40 mx-auto" />
					) : (
						<h1 className="text-5xl font-bold">
							{weatherData?.main?.temp}°
							{state.weatherData.unit === UNITS.CELCIUS ? "C" : "F"}
						</h1>
					)}

					{loading ? (
						<Skeleton className="h-5 w-32 mx-auto" />
					) : (
						<p className="text-lg text-gray-600">
							{weatherData?.weather?.[0].main}
						</p>
					)}
				</div>

				{/* Units */}
				<div className="flex justify-center w-full gap-2">
					<Button
						className={cn(
							"h-12 font-bold",
							state.weatherData.unit !== UNITS.CELCIUS &&
								"bg-[#F0F2F5] dark:!text-white dark:bg-[#293338]"
						)}
						onClick={() => {
							handleSearchCity(searchQuery, UNITS.CELCIUS);
							setUnit(UNITS.CELCIUS);
						}}
					>
						Celcius
					</Button>
					<Button
						className={cn(
							"h-12 font-bold",
							state.weatherData.unit !== UNITS.FAHRENHEIT &&
								"bg-[#F0F2F5] dark:!text-white dark:bg-[#293338]"
						)}
						onClick={() => {
							handleSearchCity(searchQuery, UNITS.FAHRENHEIT);
							setUnit(UNITS.FAHRENHEIT);
						}}
					>
						Farenheit
					</Button>
				</div>

				{/* Search Bar */}
				<Input
					icon={
						<BiSearch className="size-5 text-[#637D87] dark:text-[#9EB0B8]" />
					}
					value={searchQuery}
					placeholder="Search for a location"
					onChange={(event) => setSearchQuery(event.target.value)}
					suffix={
						<Button
							className="h-12 font-bold"
							loading={loading}
							onClick={() => handleSearchCity(searchQuery, stateUnit)}
						>
							Search
						</Button>
					}
				/>
			</div>
		</div>
	);
}

export default WeatherCard;
