import useSWR from "swr";
import CountryCard from "../components/countryCard";
import { useState } from "react";
import FilterRegion from "../components/filter/filterRegion";
import cloneDeep from "lodash.clonedeep";

const countriesURL = "https://restcountries.com/v3.1/all";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
	const { data, error } = useSWR(countriesURL, fetcher);
	const [filterByRegion, setFilterByRegion] = useState(false);
	const [filterBySearch, setFilterBySearch] = useState("");
	let filteredData = cloneDeep(data);
	if (filterByRegion && data) {
		filteredData = filteredData.filter((country) => {
			if (country.region == filterByRegion) {
				return country;
			}
		});
	}
	if (filterBySearch && data) {
		filteredData = filteredData.filter((country) =>
			country.name.common
				.toLowerCase()
				.includes(filterBySearch.toLowerCase())
		);
	}

	return (
		<section>
			{console.log(data)}
			<form className="flex justify-between w-full">
				<input
					value={filterBySearch}
					onInput={(e) => setFilterBySearch(e.target.value)}
					type="text"
					placeholder="Search for a country..."
					className="h-16 w-[30rem] rounded-xl border-[2px] text-darkGray
        text-[14px] font-semibold placeholder:text-darkGray
        bg-[url('../public/icons/search-icon.svg')] bg-no-repeat bg-[length:16px_16px]
        bg-[center_left_2rem] pl-20"
				/>

				<FilterRegion
					filterByRegion={filterByRegion}
					setFilterByRegion={setFilterByRegion}
				/>
			</form>
			<section className="my-24 flex flex-wrap gap-x-44 gap-y-20">
				{data
					? filteredData.map((country) => (
							<CountryCard country={country} />
					  ))
					: "Loading..."}
			</section>
		</section>
	);
}
