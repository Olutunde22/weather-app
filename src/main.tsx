import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./weather-app";
import { ThemeProvider } from "./providers/theme-provider";
import { WeatherProvider } from "./providers/weather-provider";
import { SidebarProvider } from "./providers/sidebar-provider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<SidebarProvider>
				<WeatherProvider>
					<App />
				</WeatherProvider>
			</SidebarProvider>
		</ThemeProvider>
	</StrictMode>
);
