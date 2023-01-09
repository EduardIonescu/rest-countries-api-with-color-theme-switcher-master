import useSWR from "swr";
import CountryCard from "../components/countryCard";
import { useState } from "react";
import FilterRegion from "../components/filter/filterRegion";
import cloneDeep from "lodash.clonedeep";

const countriesURL = "https://restcountries.com/v3.1/all";
const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getStaticProps() {
	const res = await fetch(countriesURL);
	const countriesData = await res.json();
	return {
		props: {
			countriesData,
		},
	};
}

export default function Home({ countriesData }) {
	//const { data, error } = useSWR(countriesURL, fetcher);
	const [filterByRegion, setFilterByRegion] = useState(false);
	const [filterBySearch, setFilterBySearch] = useState("");
	let filteredData = cloneDeep(countriesData);
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

	return (
		<section>
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
			<section
				className="my-24 flex flex-wrap flex-col items-center md:flex-row xl:gap-x-[calc((100%-(256px*4))/3)]
			lg:gap-x-[calc((100%-(256px*3))/2)] md:gap-x-[calc(100%-(256px*2))] gap-y-20"
			>
				{countriesData
					? filteredData.map((country) => (
							<CountryCard key={country.cca2} country={country} />
					  ))
					: "Loading..."}
			</section>
		</section>
	);
}
