import { useTheme } from "@/providers/theme-provider";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};
	return (
		<div
			className="relative bg-[#141414] rounded-full flex px-2 py-1 gap-2 cursor-pointer transition-all"
			onClick={toggleTheme}
		>
			<div className="bg-[#F5F5F5] h-7 z-0 w-7 mr-2 rounded-full absolute dark:right-[calc(100%-2.25rem)] !transition-all !duration-200 dark:ml-2 dark:mr-0 right-0"></div>

			<BiMoon className="h-7 w-7 text-[#828282] dark:text-[#080808] rounded-full p-1 z-10" />
			<BiSun className="h-7 w-7 text-[#080808] dark:text-[#828282] rounded-full p-1 z-10" />
		</div>
	);
};

export default ThemeToggle;
