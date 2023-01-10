import useSWR from "swr";
import CountryCard from "../components/countryCard";
import { useEffect, useState } from "react";
import FilterRegion from "../components/filter/filterRegion";
import cloneDeep from "lodash.clonedeep";

const countriesURL = "https://restcountries.com/v3.1/all";

/*
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
*/
export default function Home() {
	//const { data, error } = useSWR(countriesURL, fetcher);
	const [countriesData, setCountriesData] = useState([]);
	const [filterByRegion, setFilterByRegion] = useState(false);
	const [filterBySearch, setFilterBySearch] = useState("");

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
		<main
			className="w-full  py-10 px-20 bg-veryLightGray transition duration-300
		 dark:bg-veryDarkBlue"
		>
			<section>
				<form className="flex justify-between w-full">
					<input
						value={filterBySearch}
						onInput={(e) => setFilterBySearch(e.target.value)}
						type="text"
						placeholder="Search for a country..."
						className="h-16 w-[30rem] rounded-xl border-[2px] text-darkGray
				dark:text-white focus:outline-none  border-darkBlue transition-all
				duration-300
        text-[14px] font-semibold placeholder:text-darkGray dark:bg-darkBlue
				dark:placeholder:text-white bg-[url('../public/icons/search-icon.svg')]
				bg-no-repeat bg-[length:16px_16px] bg-[center_left_2rem] pl-20"
					/>

					<FilterRegion
						filterByRegion={filterByRegion}
						setFilterByRegion={setFilterByRegion}
					/>
				</form>
				<section
					className="my-24 flex flex-wrap flex-col items-center md:flex-row 
			xl:gap-x-[calc((100%-(256px*4))/3)] lg:gap-x-[calc((100%-(256px*3))/2)] 
			md:gap-x-[calc(100%-(256px*2))] gap-y-20"
				>
					{countriesData.length >= 1
						? filteredData.map((country) => (
								<CountryCard
									key={country.cca2}
									country={country}
								/>
						  ))
						: "Loading..."}
				</section>
			</section>
		</main>
	);
}
