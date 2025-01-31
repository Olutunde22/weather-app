/* eslint-disable @typescript-eslint/no-explicit-any */
import { UNITS } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getErrorMessage(
	error: unknown,
	{ message }: { message: string }
): string {
	if (
		error instanceof Error ||
		(error && typeof error === "object" && "message" in error)
	) {
		return (error as { message: string }).message;
	}

	if (Array.isArray((error as any)?.message)) {
		return (error as any).message.join("\n");
	}

	if (typeof error === "object" && error !== null) {
		const errObj = error as Record<string, unknown>;

		if (errObj.response && typeof errObj.response === "object") {
			const response = errObj.response as Record<string, unknown>;

			if (typeof response.status === "number" && response.status < 500) {
				if (response.data && typeof response.data === "object") {
					const data = response.data as Record<string, unknown>;

					if (typeof data.message === "string") {
						return data.message;
					}
				}
				return `Error: ${response.status}`;
			}
		}
	}

	return message ?? "Oops! Something went wrong, please try again later.";
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


export function getWeatherIconUrl(icon?: string): string {
	return `https://openweathermap.org/img/wn/${icon ?? '01d'}@2x.png`;
}


export function getWindSpeedAndDirection(
	speed: number,
	degree: number,
	unit: UNITS
): { speed: string; direction: string } {
	const directions = ["North", "East", "South", "West"];
	const index = Math.round(degree / 90) % 4;
	const direction = directions[index];

	let windSpeed: string;
	if (unit === UNITS.CELCIUS) {
		windSpeed = `${speed.toFixed(1)} m/s`;
	} else {
		const speedMph = (speed * 2.237).toFixed(1);
		windSpeed = `${speedMph} mph`;
	}

	return { speed: windSpeed, direction };
}

export const debounce = (func: (...args: any[]) => void, wait: number) => {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};