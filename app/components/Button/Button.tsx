import { motion } from "motion/react"
import type { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
	children?: ReactNode,
	className?: string,
	onClick?: () => void,
	disabled?: boolean,
	size?: "sm" | "md" | "lg"
	type?: 'button' | 'submit';
}

const variants = {
	"hover": {
		scale: 1.05,
	},
	"focus": {
		scale: 0.97,
	}
}

export default function Button({ children, className = "", onClick, disabled, size = "md", type = "button" }: ButtonProps) {
	return (
		<motion.button type={type}
			className={`${styles.button} ${styles[size]} ${className}`}
			variants={variants}
			whileHover="hover"
			whileTap="focus"
			transition={{ duration: 0.1 }}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</motion.button>
	);
}
