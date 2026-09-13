import { motion } from "motion/react"
import styles from "./Pizza.module.scss"

interface PizzaProps {

}

export default function Pizza({ }: PizzaProps) {
	return (
		<motion.div
			className={styles.pizza}
		/>
	)
}
