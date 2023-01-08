import Image from "next/image";

export default function Navbar() {
	return (
		<header className="w-full">
			<nav
				className="text-veryDarkBlueLightMode font-nunito flex justify-between
      px-20 py-8 bg-white"
			>
				<h1 className="font-extrabold text-2xl">Where in the world?</h1>
				<button className="font-semibold flex items-center gap-2">
					<Image
						src="/icons/moon-icon.svg"
						height={16}
						width={12}
						className={"w-4 h-4"}
					/>{" "}
					Dark Mode
				</button>
			</nav>
		</header>
	);
}
