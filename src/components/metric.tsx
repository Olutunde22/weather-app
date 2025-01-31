import { WeatherMetricProps } from "@/types";
import { Skeleton } from "./skeleton";

export function WeatherMetric({
	icon,
	title,
	value,
	loading,
}: WeatherMetricProps) {
	return (
		<div className="p-4 w-full rounded-xl dark:text-white dark:bg-[#1C2426] border border-[#DBE3E5] dark:border-[#3D4D54]">
			{loading ? <Skeleton className="size-6" /> : icon}
			<div className="mt-3 mb-1">
				{loading ? (
					<Skeleton className="h-4 w-12" />
				) : (
					<p className="text-base font-bold leading-5">{title} </p>
				)}
			</div>
			<div className="text-[#9EB0B8] text-sm">
				{loading ? <Skeleton className="h-4 w-20" /> : value}
			</div>
		</div>
	);
}
