import { cn } from "@/lib/helper-functions";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"animate-pulse rounded-md bg-[#F0F2F5] dark:bg-[#293338]",
				className
			)}
			{...props}
		/>
	);
}

export { Skeleton };
