import { useId } from "react";
import { useTheme } from "~/hooks/useTheme";
import styles from "./ThemeToggle.module.scss";
import { motion, type Variants } from "motion/react"

interface ThemeToggleProps {
	className?: string;
}
const variants: Variants = {
	dark: {
		cx: 120,
		cy: 80,
		transition: { duration: 0.3, ease: "easeInOut" },
	},
	light: {
		cx: 200,
		cy: 0,
		transition: { duration: 0.3, ease: "easeInOut" },
	},
}

const lineVariants: Variants = {
	dark: { pathLength: 0, opacity: 0 },
	light: (i: number) => {
		const delay = i * 0.1
		return {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { delay, type: "spring", duration: 1, bounce: 0 },
				opacity: { delay, duration: 0.01 },
			},
		}
	},
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
	const { theme, toggleTheme } = useTheme();
	const maskId = useId();
	const isLight = theme === "light";

	const width = 200;
	const hwidth = width / 2;
	const height = 200;
	const hheight = height / 2;
	const radius = 45;
	const lineGap = 15;
	const lines = 8;
	const lineWidth = 10;
	const lineLength = 15;

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`${styles.themeToggle} ${className}`}
			aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
			aria-pressed={!isLight}
		>
			<motion.svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}
				animate={isLight ? "light" : "dark"}
			>
				<mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
					<rect x="0" y="0" width={width} height={height} fill="white" />
					<motion.circle
						variants={variants}
						r={radius - 10}
						fill="black"
					/>
				</mask>
				<motion.circle
					className={styles.moon}
					cx={hwidth} cy={hheight} r={radius}
					mask={`url(#${maskId})`}
				/>
				{Array.from({ length: lines }).map((_, i) => {
					const rad = i * ((Math.PI * 2) / lines)
					const dirx = Math.cos(rad);
					const diry = Math.sin(rad);
					const x1 = hwidth + radius * dirx + lineGap * dirx;
					const y1 = hheight + radius * diry + lineGap * diry;
					const x2 = x1 + lineLength * dirx;
					const y2 = y1 + lineLength * diry;
					return (
						<motion.line
							key={`line ${i}`}
							className={styles.ray}
							strokeWidth={lineWidth}
							x1={x1}
							x2={x2}
							y1={y1}
							y2={y2}
							variants={lineVariants}
							custom={i}
						>
						</motion.line>
					)
				})}
			</motion.svg>
		</button>
	);
}
