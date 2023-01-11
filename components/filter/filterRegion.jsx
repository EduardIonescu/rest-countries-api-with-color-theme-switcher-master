import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Made it because the UI wants to display America for both continents lol
const regions = [
	["Africa", "Africa"],
	["America", "Americas"],
	["Asia", "Asia"],
	["Europe", "Europe"],
	["Oceania", "Oceania"],
];

export default function FilterRegion({ filterByRegion, setFilterByRegion }) {
	const [selectIsOpen, setSelectIsOpen] = useState(false);
	function toggleSelect() {
		setSelectIsOpen(!selectIsOpen);
	}

	const optionsRef = useRef(null);
	const optionsTitleRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				optionsRef.current &&
				!optionsRef.current.contains(event.target) && //Outside of options container
				!optionsTitleRef.current.contains(event.target) //Outside of options button
			) {
				setSelectIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [optionsRef]);
	return (
		<fieldset className="relative w-48 font-semibold text-[14px] dark:text-white">
			<button
				onClick={toggleSelect}
				ref={optionsTitleRef}
				type="button"
				className="w-full flex items-center justify-between rounded-md transition-all
				duration-300 hover:shadow-md hover:-translate-x-[1px] dark:hover:invert-[2%]
				dark:hover:shadow-lg
    bg-white dark:bg-darkBlue pr-5 pl-6 h-16 shadow text-[14px] font-semibold"
			>
				{filterByRegion
					? filterByRegion != "Americas"
						? filterByRegion
						: "America"
					: "Filter by Region"}
				<Image
					className={`dark:invert transition duration-200 ease-in ${
						selectIsOpen ? "rotate-0" : "rotate-180"
					}`}
					src={"/icons/angle-down-icon.svg"}
					alt=""
					aria-hidden="true"
					width={16}
					height={16}
				/>
			</button>
			{selectIsOpen && (
				<ul
					ref={optionsRef}
					className={
						"z-10 absolute mt-2 w-full rounded-sm bg-white dark:bg-darkBlue py-3 shadow"
					}
				>
					<li
						key="default"
						className="cursor-pointer select-none px-6 leading-7"
						onClick={() => {
							toggleSelect();
							setFilterByRegion(false);
						}}
					>
						All
					</li>
					{regions.map((region) => (
						<li
							key={region[0]}
							className="cursor-pointer select-none px-6 leading-7"
							onClick={() => {
								toggleSelect();
								setFilterByRegion(region[1]);
							}}
						>
							{region[0]}
						</li>
					))}
				</ul>
			)}
		</fieldset>
	);
}
