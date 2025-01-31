import { cn } from "@/lib/helper-functions";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	suffix?: React.ReactNode;
	icon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, suffix, ...props }, ref) => {
		return (
			<div className={cn("relative flex justify-center items-center w-full")}>
				{icon && (
					<div className="absolute left-1 top-1/2 ml-3 flex -translate-y-1/2 transform items-center justify-center">
						{icon}
					</div>
				)}
				<input
					type={type}
					className={cn(
						"flex h-16 w-full rounded-xl text-[#637D87] dark:text-[#9EB0B8] bg-[#F0F2F5] dark:bg-[#293338] p-2 focus-visible:outline-none",
						className,
						suffix && "pr-10",
						icon && "pl-10"
					)}
					data-test={props.name}
					ref={ref}
					{...props}
				/>
				{suffix && (
					<div className="absolute right-1 top-1/2 mr-3 flex -translate-y-1/2 transform items-center justify-center">
						{suffix}
					</div>
				)}
			</div>
		);
	}
);
Input.displayName = "Input";

export default Input;
