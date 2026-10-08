import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import AddPizzaButton from "~/components/AddPizzaButton/AddPizzaButton";
import styles from "./Navbar.module.scss";
import Language from "../Language/Language";
import { useState } from "react";
import { motion, type Variants } from "motion/react"

interface NavbarProps {
}

const variants: Variants = {
	wrapped: {
		height: "4rem",
	},
	unwrapped: {
		height: "70vh",
	},
}

export default function Navbar({ }: NavbarProps) {
	const { t } = useTranslation();
	const [wrapped, setWrapped] = useState(true);

	return (
		<motion.nav className={styles.navbar}
			initial={false}
			variants={variants}
			animate={wrapped ? "wrapped" : "unwrapped"}
		>
			<div className={styles.upperNav}>
				<Link to="/" className={styles.brand}>Pizzaindex</Link>
				<ul className={styles.links}>
					<li>
						<Language />
					</li>
					<li>
						<ThemeToggle />
					</li>
					<li>
						<Link to="/admin" className={styles.link}>
							{t("navbar.admin")}
						</Link>
					</li>
					<li>
						<Link to="/charts" className={styles.link}>
							{t("navbar.charts")}
						</Link>
					</li>
					<li>
						<Link to="/stats" className={styles.link}>
							{t("navbar.stats")}
						</Link>
					</li>
					<li>
						<AddPizzaButton to="/add" size="sm" className={styles.addPizza} />
					</li>

				</ul>
				<button className={styles.wrap}
					type="button"
					onClick={() => setWrapped(v => !v)}
					aria-expanded={!wrapped}
					aria-label={t("navbar.menu")}
				>
					<span />
					<span />
					<span />
				</button>
			</div>
			<div className={styles.content} inert={wrapped}>
				<div className={styles.phoneToggles}>
					<Language />
					<ThemeToggle />
				</div>
				<Link to="/charts" className={styles.link} onClick={() => setWrapped(true)}>
					{t("navbar.charts")}
				</Link>
				<Link to="/stats" className={styles.link} onClick={() => setWrapped(true)}>
					{t("navbar.stats")}
				</Link>
				<AddPizzaButton to="/add" className={styles.addPizza} onClick={() => setWrapped(true)} />
			</div>
		</motion.nav>
	);
}
