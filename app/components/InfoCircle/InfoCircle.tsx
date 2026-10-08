import Tooltip from "~/components/Tooltip/Tooltip";
import styles from "./InfoCircle.module.scss";

interface InfoCircleProps {
	label: string,
	className?: string,
	position?: "top" | "bottom" | "left" | "right",
	size?: "sm" | "md" | "lg",
}

export default function InfoCircle({ label, className = "", position, size = "md" }: InfoCircleProps) {
	return (
		<Tooltip label={label} position={position} className={className}>
			<button type="button"
				className={`${styles.infoCircle} ${styles[size]}`}
				aria-label={label}
			>
				<svg className={styles.icon} viewBox="0 0 100 100" aria-hidden="true">
					<line x1="50" y1="27" x2="50" y2="27" />
					<line x1="50" y1="46" x2="50" y2="74" />
				</svg>
			</button>
		</Tooltip>
	);
}
