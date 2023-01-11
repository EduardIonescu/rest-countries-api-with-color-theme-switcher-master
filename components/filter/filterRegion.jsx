import { useEffect, useState, useRef } from "react";
import FilterOptions from "./filterOptions";
import FilterButton from "./filterButton";

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
			<FilterButton
				toggleSelect={toggleSelect}
				filterByRegion={filterByRegion}
				selectIsOpen={selectIsOpen}
				ref={optionsTitleRef}
			/>
			{selectIsOpen && (
				<FilterOptions
					ref={optionsRef}
					toggleSelect={toggleSelect}
					setFilterByRegion={setFilterByRegion}
				/>
			)}
		</fieldset>
	);
}
