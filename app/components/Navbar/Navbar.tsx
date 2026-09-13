import { Link } from "react-router";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.scss";

interface NavbarProps {
	variant?: "streaked";
}

export default function Navbar({ variant }: NavbarProps) {
	return (
		<nav className={styles.nav} data-variant={variant}>
			<Link to="/" className={styles.brand}>Pizzaindex</Link>
			<ul className={styles.links}>
				<li>
					<ThemeToggle />
				</li>
				<li>
					<Link to="/admin" className={styles.link}>
						Admin
					</Link>
				</li>
				<li>
					<Link to="/" className={styles.link}>
						Charts
					</Link>
				</li>
				<li>
					<Link to="/add" className={styles.addPizza}>
						Add Pizza
					</Link>
				</li>

			</ul>
		</nav>
	);
}
