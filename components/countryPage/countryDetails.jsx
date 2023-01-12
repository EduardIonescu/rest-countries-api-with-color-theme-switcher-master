import BorderCountries from "./borderCountries/borderCountries";

export default function CountryDetails({ countryData, borderNames }) {
	const primaryLanguage = Object.keys(countryData.languages)[0];
	const nativeName = countryData.name.nativeName[primaryLanguage].common;
	const currencies = countryData.currencies
		? Object.values(countryData.currencies).map((currency) => currency.name)
		: ["None"];
	return (
		<article
			className="text-veryDarkBlueLightMode max-md:w-full
dark:text-veryLightGray transition-all duration-300 2xl:mr-20 sm:text-center
md:text-left"
		>
			<h2 className="font-extrabold text-[24px] md:text-[32px] mb-4 md:mb-6">
				{countryData.name.common}
			</h2>
			<div
				className="flex flex-col xl:flex-row text-sm md:text-base
   gap-8 xl:gap-24 2xl:gap-36"
			>
				<div>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Native Name</span>:{" "}
						{nativeName}
					</p>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Population</span>:{" "}
						{countryData.population.toLocaleString("en")}
					</p>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Region</span>:{" "}
						{countryData.region}
					</p>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Sub Region</span>:{" "}
						{countryData.subregion || "None"}
					</p>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Capital</span>:{" "}
						{countryData.capital /*Countries with no Capital */
							? countryData.capital[0]
							: "None"}
					</p>
				</div>
				<div>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Top Level Domain</span>
						: {countryData.tld.join(", ")}
					</p>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Currencies</span>:{" "}
						{currencies.join(", ")}
					</p>
					<p className="font-semibold leading-9">
						<span className="font-extrabold">Languages</span>:{" "}
						{Object.values(countryData.languages).join(", ")}
					</p>
				</div>
			</div>

			<BorderCountries borderNames={borderNames} />
		</article>
	);
}
