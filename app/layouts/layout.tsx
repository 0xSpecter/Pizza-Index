import { Outlet } from "react-router";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import { AnimatePresence } from "motion/react";

export default function Layout() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1">
				<AnimatePresence mode="popLayout">
					<Outlet />
				</AnimatePresence>
			</main>
			<Footer />
		</div>
	);
}
