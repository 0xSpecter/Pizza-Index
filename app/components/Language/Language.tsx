import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Language.module.scss";
import { motion, type Variants } from "motion/react"


interface LanguageProps {
	className?: string;
}

export default function Language({ className = "" }: LanguageProps) {
	const { t, i18n } = useTranslation();
	const next = i18n.resolvedLanguage === "nb" ? "en" : "nb";
	const isEnglish = i18n.resolvedLanguage === "en";

	const width = 320;
	const hwidth = width / 2;
	const height = 180;
	const hheight = height / 2;
	const boxWidth = 30;
	const gap = 20;
	const nbPos = boxWidth * 3;
	const enPos = hwidth;

	const transition = { duration: 0.3, ease: "easeInOut" } as const;

	const variants: Variants = {
		english: {
			x1: enPos,
			x2: enPos,
			transition,
		},
		norwegian: {
			x1: nbPos,
			x2: nbPos,
			transition,
		},
	}

	// Each corner is a thick horizontal line whose inner end follows the vertical bar.
	const cornerHeight = hheight - boxWidth / 2 - gap * 2;
	const topY = gap + cornerHeight / 2;
	const bottomY = height - gap - cornerHeight / 2;
	const inner = boxWidth / 2 + gap;

	const leftVariants: Variants = {
		english: { x2: enPos - inner, transition },
		norwegian: { x2: nbPos - inner, transition },
	}

	const rightVariants: Variants = {
		english: { x1: enPos + inner, transition },
		norwegian: { x1: nbPos + inner, transition },
	}

	return (
		<button
			type="button"
			onClick={() => i18n.changeLanguage(next)}
			className={`${styles.language} ${className}`}
			aria-label={t("language.switch")}
		>
			<motion.svg className={`${styles.svg} ${isEnglish ? styles.en : styles.nb}`} viewBox={`0 0 ${width} ${height}`}
				initial={false}
				animate={isEnglish ? "english" : "norwegian"}
			>
				{[topY, bottomY].map((y) => (
					<Fragment key={y}>
						<motion.line className={styles.field}
							strokeWidth={cornerHeight}
							x1={gap}
							y1={y}
							y2={y}
							variants={leftVariants}
						/>
						<motion.line className={styles.field}
							strokeWidth={cornerHeight}
							x2={width - gap}
							y1={y}
							y2={y}
							variants={rightVariants}
						/>
					</Fragment>
				))}
				<line className={styles.cross}
					strokeWidth={boxWidth}
					x1={0}
					x2={width}
					y1={hheight}
					y2={hheight}
				/>
				<motion.line className={styles.cross}
					strokeWidth={boxWidth}
					y1={0}
					y2={height}
					variants={variants}
				/>
			</motion.svg>
		</button>
	);
}
