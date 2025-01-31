import { Toaster } from "sonner";
import MainBody from "./components/main-body";
import SideNav from "./components/side-nav";
import TopNav from "./components/top-nav";
import { useSideBar } from "./providers/sidebar-provider";
import { cn } from "./lib/helper-functions";

function App() {
	const { isOpen, toggleSidebar } = useSideBar();
	return (
		<div className=" h-screen w-screen bg-white dark:bg-[#121717]">
			<TopNav />
			<main className={cn("mt-5 px-2 lg:px-6 flex", isOpen && "mt-0 px-0")}>
				<SideNav />
				<MainBody />
			</main>
			<div
				onClick={() => toggleSidebar()}
				className={cn(
					"hidden fixed inset-0 z-10 bg-black/50 dark:bg-black/70",
					isOpen && "block"
				)}
			/>
			<Toaster position="top-right" />
		</div>
	);
}

export default App;
