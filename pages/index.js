import { useState, useEffect } from "react";
import FilterRegion from "../components/filter/filterRegion";
import cloneDeep from "lodash.clonedeep";
import SearchBar from "../components/filter/searchBar";
import Countries from "../components/countries/countries";
import NoResults from "../components/states/noResults";
import Loading from "../components/states/loading";

const countriesURL = "https://restcountries.com/v3.1/all";

export default function Home() {
	const [countriesData, setCountriesData] = useState([]);
	const [filterByRegion, setFilterByRegion] = useState(false);
	const [filterBySearch, setFilterBySearch] = useState("");

	let filteredData = cloneDeep(countriesData).sort((a, b) => {
		return a.name.common.toLowerCase() < b.name.common.toLowerCase()
			? -1
			: 1;
	});
	if (filterByRegion && countriesData) {
		filteredData = filteredData.filter((country) => {
			if (country.region == filterByRegion) {
				return country;
			}
		});
	}
	if (filterBySearch && countriesData) {
		filteredData = filteredData.filter((country) =>
			country.name.common
				.toLowerCase()
				.includes(filterBySearch.toLowerCase())
		);
	}

	async function fetchData(url) {
		try {
			const res = await fetch(url);
			const data = await res.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		let ignore = false;

		// Delete localStorage before deployment
		let data = JSON.parse(localStorage.getItem("data"));
		async function startFetching() {
			if (!data) {
				data = await fetchData(countriesURL);
				localStorage.setItem("data", JSON.stringify(data));
			}
			if (!ignore) {
				setCountriesData(data);
			}
		}
		startFetching();

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<main
			className="w-full py-6 md:py-10 px-4 md:px-20 bg-veryLightGray transition duration-300
		 dark:bg-veryDarkBlue min-h-[calc(100vh-96px)] z-0"
		>
			<section>
				<form className="flex flex-wrap gap-y-10 gap-x-4 justify-between w-full">
					<SearchBar
						filterBySearch={filterBySearch}
						setFilterBySearch={setFilterBySearch}
					/>

					<FilterRegion
						filterByRegion={filterByRegion}
						setFilterByRegion={setFilterByRegion}
					/>
				</form>
				{/*countriesData && filteredData.length >= 1 ? (
					<Countries
						countriesData={countriesData}
						filteredData={filteredData}
						setCountriesData={setCountriesData}
					/>
				) : (
					<NoResults />
				)*/}

				{countriesData.length >= 1 ? (
					filteredData.length >= 1 ? (
						<Countries
							countriesData={countriesData}
							filteredData={filteredData}
							setCountriesData={setCountriesData}
						/>
					) : (
						<NoResults />
					)
				) : (
					<Loading />
				)}
			</section>
		</main>
	);
}
