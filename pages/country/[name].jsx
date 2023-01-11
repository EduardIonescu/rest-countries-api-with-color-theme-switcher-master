import {
	getAllCountriesIds,
	getCountryData,
	getAllCountryBorders,
} from "../../lib/countries";
import Link from "next/link";
import Image from "next/image";
import BorderCountries from "../../components/borderCountries/borderCountries";

export async function getStaticProps({ params }) {
	const countryData = await getCountryData(params.name);

	const countryBorders = await countryData.borders;
	let borderNames;
	if (countryBorders) {
		borderNames = await getAllCountryBorders(countryBorders);
	}
	if (!borderNames) {
		borderNames = null;
	}
	return {
		props: {
			countryData,
			borderNames,
		},
	};
}

// Slow in development, change if it's still slow after deployment
export async function getStaticPaths() {
	const paths = await getAllCountriesIds();
	return {
		paths,
		fallback: false,
	};
}

export default function Country({ countryData, borderNames }) {
	const borders = countryData.borders && countryData.borders;
	const primaryLanguage = Object.keys(countryData.languages)[0];
	const nativeName = countryData.name.nativeName[primaryLanguage].common;
	const currencies = countryData.currencies
		? Object.values(countryData.currencies).map((currency) => currency.name)
		: ["None"];
	return (
		<main
			className="w-full pt-10 pb-16 md:pb-10 px-6 md:px-20 bg-white
		 dark:bg-veryDarkBlue transition-all duration-300 min-h-[calc(100vh-96px)]"
		>
			<section className="md:mt-10">
				<Link
					href="/"
					className="md:group flex gap-2 md:gap-4 items-center bg-white 
					dark:bg-darkBlue w-28 md:w-40 h-9 md:h-12 justify-center
        rounded-md shadow-md font-semibold transition-all duration-300 ease-linear
				md:hover:shadow-xl text-sm md:text-base"
				>
					<Image
						className="rotate-180 transition-all duration-300 ease-out
					md:group-hover:-translate-x-2 dark:invert md:w-[18px]"
						src="/icons/arrow-icon.svg"
						alt=""
						aria-hidden="true"
						width={14}
						height={10}
					/>
					Back
				</Link>
				<section
					className="mt-16 md:mt-20 flex items-center gap-12 md:gap-20 
				justify-between flex-col md:flex-row"
				>
					<img
						src={countryData.flags.png}
						alt={`${countryData.name.common}'s Flag`}
						className="w-full md:w-[600px] max-md:max-w-[350px] max-h-[420px] 
						object-contain"
					/>
					<article
						className="text-veryDarkBlueLightMode max-md:w-full
					dark:text-veryLightGray transition-all duration-300"
					>
						<h2 className="font-extrabold text-[24px] md:text-[32px] mb-4 md:mb-6">
							{countryData.name.common}
						</h2>
						<div
							className="flex flex-col md:flex-row text-sm md:text-base
						 gap-8 md:gap-36"
						>
							<div>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Native Name
									</span>
									: {nativeName}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Population
									</span>
									:{" "}
									{countryData.population.toLocaleString(
										"en"
									)}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Region
									</span>
									: {countryData.region}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Sub Region
									</span>
									: {countryData.subregion || "None"}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Capital
									</span>
									:{" "}
									{countryData.capital /*Countries with no Capital */
										? countryData.capital[0]
										: "None"}
								</p>
							</div>
							<div>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Top Level Domain
									</span>
									: {countryData.tld.join(", ")}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Currencies
									</span>
									: {currencies.join(", ")}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Languages
									</span>
									:{" "}
									{Object.values(countryData.languages).join(
										", "
									)}
								</p>
							</div>
						</div>

						<BorderCountries borderNames={borderNames} />
					</article>
				</section>
			</section>
		</main>
	);
}
