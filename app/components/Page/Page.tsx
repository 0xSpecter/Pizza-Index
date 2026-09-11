import { motion } from "motion/react"
import type { ReactNode } from "react"

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
		<motion.div className={`${className} min-w-full min-h-full bg-bg`}
			variants={variants}
			initial="initial"
			animate="open"
			exit="exit"
		>
			{children}
		</motion.div>
	)
}
