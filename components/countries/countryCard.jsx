import Link from "next/link";
export default function CountryCard({ country }) {
	return (
		<Link
			href={`/country/${country.name.common.toLowerCase()}`}
			className="h-[345px] max-w-64 rounded-md overflow-hidden bg-white 
			dark:bg-darkBlue transition-all duration-300 shadow md:hover:-translate-y-2
			md:hover:rotate-2 md:hover:shadow-lg md:dark:hover:shadow-xl"
		>
			<img
				src={country.flags.png}
				alt={`${country.name.common}'s flag`}
				width={250}
				height={160}
				className="w-64 h-40 object-cover"
			/>

			<div
				className="px-[26px] text-veryDarkBlueLightMode dark:text-veryLightGray
				text-[14px] font-light leading-6 transition duration-300"
			>
				<h2 className="pt-6 md:pt-7 pb-5 max-w-[204px] font-extrabold text-[19px]">
					{country.name.common}
				</h2>
				<p>
					<span className="font-semibold">Population:</span>{" "}
					{country.population.toLocaleString("en")}
					{/* If you remove "en" it throws error*/}
				</p>
				<p>
					<span className="font-semibold">Region:</span>{" "}
					{country.region}
				</p>
				<p>
					<span className="font-semibold">Capital:</span>{" "}
					{country.capital ? country.capital[0] : "None"}
				</p>
			</div>
		</Link>
	);
}
