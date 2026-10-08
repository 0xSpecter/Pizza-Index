import { AnimatePresence, motion, type Variants } from "motion/react"
import { cloneElement, useId, useState, type KeyboardEvent, type ReactElement } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
	children: ReactElement,
	label: string,
	className?: string,
	position?: "top" | "bottom" | "left" | "right",
}

const variants: Variants = {
	"closed": {
		opacity: 0,
		scale: 0.9,
		transition: { duration: 0.1 },
	},
	"open": {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.1 },
	},
}

export default function Tooltip({ children, label, className = "", position = "left" }: TooltipProps) {
	const [open, setOpen] = useState(false);

	return (
		<span className={`${styles.tooltip} ${className}`}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			onFocus={() => setOpen(true)}
			onBlur={() => setOpen(false)}
			onKeyDown={e => e.key === "Escape" && setOpen(false)}
		>
			{children}
			<AnimatePresence>
				{open && (
					<motion.span className={`${styles.bubble} ${styles[position]}`}
						variants={variants}
						initial="closed"
						animate="open"
						exit="closed"
						style={{ x: "-50%" }}
					>
						{label}
					</motion.span>
				)}
			</AnimatePresence>
		</span>
	);
}
