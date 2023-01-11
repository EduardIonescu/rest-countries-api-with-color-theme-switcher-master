import { forwardRef } from "react";
import Image from "next/image";

const FilterButton = forwardRef(
	({ toggleSelect, filterByRegion, selectIsOpen }, ref) => {
		return (
			<button
				onClick={toggleSelect}
				ref={ref}
				type="button"
				className="w-[205px] md:w-full flex items-center justify-between 
  rounded-md transition-all duration-300 hover:shadow-md hover:-translate-x-[1px] 
  dark:hover:invert-[2%] dark:hover:shadow-lg bg-white dark:bg-darkBlue 
  pr-5 pl-6 h-[50px] md:h-16 shadow text-xs md:text-sm font-semibold"
			>
				{filterByRegion
					? filterByRegion != "Americas"
						? filterByRegion
						: "America"
					: "Filter by Region"}
				<Image
					className={`dark:invert transition duration-200 ease-in md:w-4 md:h-4 ${
						selectIsOpen ? "rotate-0" : "rotate-180"
					}`}
					src={"/icons/angle-down-icon.svg"}
					alt=""
					aria-hidden="true"
					width={12}
					height={12}
				/>
			</button>
		);
	}
);

export default FilterButton;
