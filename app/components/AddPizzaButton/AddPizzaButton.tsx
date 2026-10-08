import { motion } from "motion/react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import styles from "./AddPizzaButton.module.scss";

interface AddPizzaButtonProps {
	className?: string,
	to?: string,
	onClick?: () => void,
	disabled?: boolean,
	size?: "sm" | "md" | "lg"
	type?: 'button' | 'submit';
}

const MotionLink = motion.create(Link);

const variants = {
	"hover": {
		scale: 1.05,
		rotate: 90,
	},
	"focus": {
		scale: 0.97,
	}
}

export default function AddPizzaButton({ className = "", to, onClick, disabled, size = "md", type = "button" }: AddPizzaButtonProps) {
	const { t } = useTranslation();

	const plus = (
		<svg className={styles.plus} viewBox="0 0 100 100" aria-hidden="true">
			<line x1="50" y1="25" x2="50" y2="75" />
			<line x1="25" y1="50" x2="75" y2="50" />
		</svg>
	);

	if (to) {
		return (
			<MotionLink to={to}
				className={`${styles.addPizzaButton} ${styles[size]} ${className}`}
				variants={variants}
				whileHover="hover"
				whileTap="focus"
				transition={{ duration: 0.1 }}
				onClick={onClick}
				aria-label={t("navbar.addPizza")}
			>
				{plus}
			</MotionLink>
		);
	}

	return (
		<motion.button type={type}
			className={`${styles.addPizzaButton} ${styles[size]} ${className}`}
			variants={variants}
			whileHover="hover"
			whileTap="focus"
			transition={{ duration: 0.1 }}
			onClick={onClick}
			disabled={disabled}
			aria-label={t("navbar.addPizza")}
		>
			{plus}
		</motion.button>
	);
}
