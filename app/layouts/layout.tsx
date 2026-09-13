import { Outlet } from "react-router";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import { AnimatePresence } from "motion/react";
import styles from "./layout.module.scss";

export default function Layout() {
	return (
		<div className={styles.layout}>
			<Navbar />
			<main className={styles.main}>
				<AnimatePresence mode="popLayout">
					<Outlet />
				</AnimatePresence>
			</main>
			<Footer />
		</div>
	);
}
