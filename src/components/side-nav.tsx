import { REDUCER_TYPES } from "@/types";
import Button from "./button";
import FavoriteItem from "./favourite-item";
import { useWeather } from "@/providers/weather-provider";
import { toast } from "sonner";
import { useSideBar } from "@/providers/sidebar-provider";
import { cn } from "@/lib/helper-functions";
import CompassIcon from "@/icons/compass-icon";
import ThemeToggle from "./theme-toggle";
import avatarImage from "@/assets/avatar.png";

function SideNav() {
	const { state, dispatch } = useWeather();
	const { isOpen } = useSideBar();

	const handleAddFavorite = () => {
		if (
			!state.favorites.some((favorite) => favorite.id === state.weatherData.id)
		) {
			dispatch({
				type: REDUCER_TYPES.ADD_FAVORITE,
				payload: {
					favorite: state.weatherData,
				},
			});
		} else {
			toast.info(`${state.weatherData.name} is already in favorites`);
		}
	};
	return (
		<aside
			className={cn(
				"w-full hidden lg:block max-w-[320px] p-4 transition-all duration-300",
				isOpen && "block fixed z-20 bg-white dark:bg-[#121717]"
			)}
		>
			<div className="items-center w-full justify-between my-3 flex gap-x-8">
				<ThemeToggle />
				<div className="size-10 flex items-center justify-center text-[#121717] dark:text-white bg-[#F0F2F5] dark:bg-[#293338] rounded-xl">
					<CompassIcon />
				</div>
				<img src={avatarImage} alt="Avatar image" className="size-10" />
			</div>
			<div className="w-full p-5 border border-[#DBE3E5] dark:border-[#3D4D54] rounded-xl">
				<p className="font-bold leading-5 mb-1">Add to favorites</p>
				<span className="text-[#637D87] leading-6">
					Save your favourite cities for <br /> quick access in the future.
				</span>
				<Button onClick={() => handleAddFavorite()} className="mt-4">
					{" "}
					Add to favorites
				</Button>
			</div>

			<div className="mt-4 h-[calc(100vh-300px)] overflow-y-auto">
				{state?.favorites.map((favorite) => (
					<FavoriteItem key={favorite.id} {...favorite} />
				))}
			</div>
		</aside>
	);
}

export default SideNav;
