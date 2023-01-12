export default function SearchBar({ filterBySearch, setFilterBySearch }) {
	return (
		<input
			value={filterBySearch}
			onInput={(e) => setFilterBySearch(e.target.value)}
			type="text"
			placeholder="Search for a country..."
			className={`h-[50px] md:h-16 w-full md:w-[30rem] rounded-md md:rounded-xl
		border-[2px] text-darkGray dark:text-white focus:outline-none  
		dark:border-darkBlue transition-all duration-300 
		bg-[url("../public/icons/search-icon.svg")]
		dark:bg-[url("../public/icons/dark-search-icon.svg")]
		bg-[center_left_2rem] bg-[length:16px_16px] bg-no-repeat
		text-[14px] font-semibold placeholder:text-darkGray dark:bg-darkBlue
		dark:placeholder:text-white pl-20 text-sm md:text-base placeholder:text-xs
		md:placeholder:text-sm`}
		/>
	);
}
