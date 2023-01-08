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
		<fieldset className="relative w-48">
			<button
				onClick={toggleSelect}
				ref={optionsTitleRef}
				type="button"
				className="w-full flex items-center justify-between rounded-md
    bg-white px-4 h-16 shadow"
			>
				{filterByRegion
					? filterByRegion != "Americas"
						? filterByRegion
						: "America"
					: "Filter by Region"}
				<Image
					className={selectIsOpen ? "" : "rotate-180"}
					src={"/icons/angle-down-icon.svg"}
					width={16}
					height={16}
				/>
			</button>
			{selectIsOpen && (
				<ul
					ref={optionsRef}
					className={
						"z-2 absolute mt-2 w-full rounded-sm bg-white py-4 shadow"
					}
				>
					{regions.map((region) => (
						<li
							key={region[0]}
							className="cursor-pointer select-none px-4 leading-6"
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
