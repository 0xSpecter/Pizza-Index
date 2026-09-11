import { Link } from "react-router";
import { useTheme } from "~/hooks/useTheme";

interface NavbarProps {
	variant?: "streaked";
}

export default function Navbar({ variant }: NavbarProps) {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="flex items-center justify-between px-8 py-4" data-variant={variant}>
			<Link to="/" className="font-bold no-underline">Pizzaindex</Link>
			<ul className="m-0 flex list-none items-center gap-4 p-0">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/admin">Admin</Link></li>
				<li>
					<button
						type="button"
						onClick={toggleTheme}
						className="rounded-card border border-border px-3 py-1"
					>
						{theme === "dark" ? "Light mode" : "Dark mode"}
					</button>
				</li>
			</ul>
		</nav>
	);
}
