import CountryCard from "./countryCard";
import { useEffect } from "react";

const countriesURL = "https://restcountries.com/v3.1/all";

export default function Countries({
	countriesData,
	filteredData,
	setCountriesData,
}) {
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
		<section
			className="my-24 flex flex-wrap flex-col items-center md:flex-row 
xl:gap-x-[calc((100%-(256px*4))/3)] lg:gap-x-[calc((100%-(256px*3))/2)] 
md:gap-x-[calc(100%-(256px*2))] gap-y-20"
		>
			{countriesData.length >= 1
				? filteredData.map((country) => (
						<CountryCard key={country.cca2} country={country} />
				  ))
				: "Loading..."}
		</section>
	);
}
