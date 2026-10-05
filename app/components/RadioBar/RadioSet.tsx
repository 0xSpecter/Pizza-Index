import { useId } from "react";
import styles from "./RadioSet.module.scss";
import { motion } from "motion/react"

interface RadioSetProps {
	options: string[];
	name: string;
	value: number;
	onChange: (value: number) => void;
	onBlur?: () => void;
	variant?: "bar" | "circle";
}

export default function RadioSet({ options, name, value, onChange, onBlur, variant = "bar" }: RadioSetProps) {
	const vbar = variant === "bar";
	const bgboxId = useId();

	return (
		<div className={vbar ? styles.bar : styles.circle}>
			<div className={vbar ? styles.barRow : styles.circleRow}>
				{options && options.map((option, index) => {
					const selected = value === index;
					return (
						<label
							className={`${vbar ? styles.barOption : styles.circleOption} ${selected ? styles.selected : ""}`}
							key={`${option}-${index}`}
						>
							<input className={styles.input}
								type="radio"
								name={name}
								checked={selected}
								onChange={() => onChange(index)}
								onBlur={onBlur}
							/>
							{option}
							{selected && (
								<motion.div
									className={vbar ? styles.barBgbox : styles.circleBgbox}
									layoutId={bgboxId}
									transition={{ duration: .3 }}
								/>
							)}
						</label>
					)

				})}
			</div>
		</div>
	);
}
