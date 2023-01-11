import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Navbar() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);
	return (
		<header className="w-full shadow">
			<nav
				className="text-veryDarkBlueLightMode dark:text-white flex 
			justify-between px-4 md:px-20 py-7 md:py-8 bg-white
		dark:bg-darkBlue transition-all duration-300 text-sm"
			>
				<h1 className="font-extrabold text-base md:text-2xl">
					Where in the world?
				</h1>
				{mounted ? (
					<button
						onClick={() =>
							setTheme(theme == "light" ? "dark" : "light")
						}
						className="font-semibold flex items-center gap-2"
					>
						<Image
							src={`/icons/${
								theme == "light" ? "moon" : "sun"
							}-icon.svg`}
							alt=""
							aria-hidden="true"
							height={16}
							width={12}
							className={"w-4 h-4 dark:invert"}
						/>{" "}
						Dark Mode
					</button>
				) : (
					<button
						className="font-semibold flex items-center gap-2 
					"
					>
						<Image
							src="/icons/moon-icon.svg"
							alt=""
							aria-hidden="true"
							height={16}
							width={12}
							className={"w-4 h-4"}
						/>{" "}
						Dark Mode
					</button>
				)}
			</nav>
		</header>
	);
}
