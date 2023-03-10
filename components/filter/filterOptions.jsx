import { forwardRef } from "react";

// Made it because the UI wants to display America for both continents lol
const regions = [
	["Africa", "Africa"],
	["America", "Americas"],
	["Asia", "Asia"],
	["Europe", "Europe"],
	["Oceania", "Oceania"],
];

const FilterOptions = forwardRef(({ toggleSelect, setFilterByRegion }, ref) => {
	return (
		<ul
			ref={ref}
			className="z-10 absolute mt-2 w-full rounded-md bg-white
   dark:bg-darkBlue py-3 shadow text-[12px] md:text-[14px]"
		>
			<li
				key="default"
				className="cursor-pointer select-none px-6 leading-7
    xl:hover:text-blueHover transition duration-300"
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
					className="cursor-pointer select-none px-6 leading-7
      xl:hover:text-blueHover transition duration-300"
					onClick={() => {
						toggleSelect();
						setFilterByRegion(region[1]);
					}}
				>
					{region[0]}
				</li>
			))}
		</ul>
	);
});
// solves esLint error
FilterOptions.displayName = "FilterOptions";
export default FilterOptions;
