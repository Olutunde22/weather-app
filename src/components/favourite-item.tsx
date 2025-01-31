import { useWeather } from "@/providers/weather-provider";
import { REDUCER_TYPES, WeatherData } from "@/types";
import { BiX } from "react-icons/bi";

function FavoriteItem(props: WeatherData) {
	const { dispatch } = useWeather();
	return (
		<div className="w-full py-2 flex justify-between items-center">
			<button
				onClick={() => {
					dispatch({
						type: REDUCER_TYPES.FETCH_WEATHER_SUCCESS,
						payload: {
							weatherData: props,
							unit: props.unit,
						},
					});
				}}
				className="cursor-pointer flex gap-x-4 items-center"
			>
				<img
					src="https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					className="rounded-lg size-10"
					alt={`Image for city - ${props.name}`}
				/>
				<p className="text-base leading-6">{props.name}</p>
			</button>
			<BiX
				className="size-6 cursor-pointer text-red-500"
				onClick={() =>
					dispatch({
						type: REDUCER_TYPES.REMOVE_FAVORITE,
						payload: {
							favorite: props,
						},
					})
				}
			/>
		</div>
	);
}

export default FavoriteItem;
