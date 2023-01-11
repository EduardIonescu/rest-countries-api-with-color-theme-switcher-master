import { useState } from "react";
import FilterRegion from "../components/filter/filterRegion";
import cloneDeep from "lodash.clonedeep";
import SearchBar from "../components/filter/searchBar";
import Countries from "../components/countries/countries";

export default function Home() {
	const [countriesData, setCountriesData] = useState([]);
	const [filterByRegion, setFilterByRegion] = useState(false);
	const [filterBySearch, setFilterBySearch] = useState("");
	const [noResultsFound, setNoResultsFound] = useState(false);
	console.log(countriesData);
	let filteredData = cloneDeep(countriesData);
	if (filterByRegion && countriesData) {
		filteredData = filteredData.filter((country) => {
			if (country.region == filterByRegion) {
				return country;
			}
		});
		/**
		if (filteredData.length == 0) {
			if (noResultsFound == false) {
				setNoResultsFound(true);
			}
		} else {
			if (noResultsFound == true) {
				setNoResultsFound(false);
			}
		} */
	}
	if (filterBySearch && countriesData) {
		filteredData = filteredData.filter((country) =>
			country.name.common
				.toLowerCase()
				.includes(filterBySearch.toLowerCase())
		);
	}

	return (
		<main
			className="w-full  py-10 px-20 bg-veryLightGray transition duration-300
		 dark:bg-veryDarkBlue min-h-[calc(100vh-96px)]"
		>
			<section>
				<form className="flex justify-between w-full">
					<SearchBar
						filterBySearch={filterBySearch}
						setFilterBySearch={setFilterBySearch}
					/>

					<FilterRegion
						filterByRegion={filterByRegion}
						setFilterByRegion={setFilterByRegion}
					/>
				</form>
				{countriesData && !noResultsFound ? (
					<Countries
						countriesData={countriesData}
						filteredData={filteredData}
						setCountriesData={setCountriesData}
					/>
				) : (
					"no results found"
				)}
			</section>
		</main>
	);
}
