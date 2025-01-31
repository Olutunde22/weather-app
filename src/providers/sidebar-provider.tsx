/* eslint-disable react-refresh/only-export-components */
import React, {
	createContext,
	useState,
	ReactNode,
	useContext,
	useEffect,
} from "react";

interface SidebarContextProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
	undefined
);

interface SidebarProviderProps {
	children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1023) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		// Initial check
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSideBar = () => {
	const context = useContext(SidebarContext);

	if (context === undefined)
		throw new Error("useSideBar must be used within a SidebarProvider");

	return context;
};
