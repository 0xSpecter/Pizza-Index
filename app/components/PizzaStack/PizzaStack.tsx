import type { CSSProperties } from "react";
import Pizza from "~/components/Pizza/Pizza";
import styles from "./PizzaStack.module.scss";
import { AnimatePresence, motion } from "motion/react"

interface PizzaStackProps {
	count: number,
	className?: string,
}

const variants = {
	"initial": {
		y: -50,
		opacity: 0,
	},
	"stacked": {
		y: 0,
		opacity: 1,
	},
	"exit": {
		y: -50,
		opacity: 0,
	}
}

export default function PizzaStack({ count, className = "" }: PizzaStackProps) {
	return (
		<div
			className={`${styles.stack} ${className}`}
			style={{ "--count": count } as CSSProperties}
		>
			<AnimatePresence>
				{Array.from({ length: count }, (_, i) => (
					<motion.div
						variants={variants}
						initial="initial"
						animate="stacked"
						exit="exit"
						transition={{ delay: i / 5 }}
						key={i}
						className={styles.layer}
						style={{ "--i": i } as CSSProperties}
					>
						<Pizza />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
