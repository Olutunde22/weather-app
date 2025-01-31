import { useWeather } from "@/providers/weather-provider";
import { HighLightCardProps } from "@/types";
import { Skeleton } from "./skeleton";

function HighLightCard({ value, title, image }: HighLightCardProps) {
	const { state } = useWeather();
	return (
		<div className="w-full py-2 flex flex-col gap-x-4 items-center">
			<img
				src={image}
				className="rounded-lg size-[284px]"
				alt={`Image for today's highlight - ${title}`}
			/>
			{state.loading ? (
				<Skeleton className="h-6 w-32 mt-2" />
			) : (
				<p className="text-base leading-6">{title}</p>
			)}
			{state.loading ? (
				<Skeleton className="h-4 w-20 mt-2" />
			) : (
				<span className="text-[#9EB0B8]">{value}</span>
			)}
		</div>
	);
}

export default HighLightCard;
