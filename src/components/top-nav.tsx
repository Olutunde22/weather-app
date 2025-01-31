import ThemeToggle from "./theme-toggle";
import Input from "./input";
import { BiSearch } from "react-icons/bi";
import useSearchCity from "@/hooks/use-search-city";
import avatarImage from "@/assets/avatar.png";
import { UNITS } from "@/types";
import { debounce } from "@/lib/helper-functions";
import CompassIcon from "@/icons/compass-icon";
import WeatherIcon from "@/icons/weather-icon";
import { CgMenuRight } from "react-icons/cg";
import { useSideBar } from "@/providers/sidebar-provider";

function TopNav() {
	const { toggleSidebar } = useSideBar();
	const { handleSearchCity } = useSearchCity();
	const handleSearchCityDebounced = debounce(handleSearchCity, 1000);

	return (
		<header className="sticky top-0 z-20 bg-white dark:bg-[#121717] h-[65px] border-b px-5 lg:px-10 flex items-center justify-between border-b-[#E5E8EB]">
			<div className="flex items-center gap-x-4 text-[#121717] dark:text-white">
				<WeatherIcon />
				<h1 className="font-bold text-lg ">Weather</h1>
				<Input
					icon={
						<BiSearch className="size-5 text-[#637D87] dark:text-[#9EB0B8]" />
					}
					className="h-10 max-w-[256px] w-[160px]"
					placeholder="Search"
					onChange={(event) =>
						handleSearchCityDebounced(event.target.value, UNITS.CELCIUS)
					}
				/>
			</div>

			<div className="items-center hidden lg:flex gap-x-8">
				<ThemeToggle />
				<div className="size-10 flex items-center justify-center text-[#121717] dark:text-white bg-[#F0F2F5] dark:bg-[#293338] rounded-xl">
					<CompassIcon />
				</div>
				<img src={avatarImage} alt="Avatar image" className="size-10" />
			</div>

			{/* Menu Button For Mobile View */}
			<CgMenuRight
				onClick={() => toggleSidebar()}
				className="lg:hidden cursor-pointer text-[#121717] dark:text-white"
			/>
		</header>
	);
}

export default TopNav;
