import { cn } from "@/lib/helper-functions";
import React from "react";
import { BiLoader } from "react-icons/bi";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, loading, disabled, ...props }, ref) => {
		return (
			<button
				className={cn(
					"bg-[#33B2E5] flex items-center !text-[#121717] cursor-pointer font-normal h-8 text-center text-sm px-4 min-w-[84px] max-w-[480px] rounded-xl ",
					className
				)}
				ref={ref}
				{...props}
				disabled={disabled || loading}
			>
				{loading && <BiLoader className="mr-2 h-4 w-4 animate-spin" />}
				{props.children}
			</button>
		);
	}
);
Button.displayName = "Button";

export default Button;
