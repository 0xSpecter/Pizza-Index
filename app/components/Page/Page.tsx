import { motion } from "motion/react"
import type { ReactNode } from "react"
import styles from "./Page.module.scss"

const variants = {
	"initial": {
		opacity: 0,
	},
	"open": {
		opacity: 1,
	},
	"exit": {
		opacity: 0,
	},
}

interface PageProps {
	children?: ReactNode;
	className?: string;
}

export default function Page({ children, className = "" }: PageProps) {
	return (
		<motion.div className={`${styles.page} ${className}`}
			variants={variants}
			initial="initial"
			animate="open"
			exit="exit"
		>
			{children}
		</motion.div>
	)
}
