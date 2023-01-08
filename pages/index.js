import useSWR from "swr";
import CountryCard from "../components/countryCard";

const countriesURL = "https://restcountries.com/v3.1/all";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
	const { data, error } = useSWR(countriesURL, fetcher);
	return (
		<section>
			{console.log(data)}
			<input
				type="text"
				placeholder="Search for a country..."
				className="h-[60px] w-[30rem] rounded-xl border-[2px] text-darkGray
        text-[14px] font-semibold placeholder:text-darkGray
        bg-[url('../public/icons/search-icon.svg')] bg-no-repeat bg-[length:16px_16px]
        bg-[center_left_2rem] pl-20"
			/>
			<section className="my-24 mx-6 flex flex-wrap gap-x-44 gap-y-20">
				{data
					? data.map((country) => <CountryCard country={country} />)
					: "Loading..."}
			</section>
		</section>
	);
}
