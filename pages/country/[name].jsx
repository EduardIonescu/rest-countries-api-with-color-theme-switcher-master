import {
	getAllCountriesIds,
	getCountryData,
	getAllCountryBorders,
} from "../../lib/countries";
import Link from "next/link";
import Image from "next/image";
import BorderLink from "../../components/borderLink";

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
/**
 * 	useEffect(() => {
		let ignore = false;

		async function fetchBorderData(border) {
			try {
				const res = await fetch(
					`https://restcountries.com/v3.1/alpha/${border}`
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.log(err);
			}
		}

		async function setBorderName(border) {
			const data = await fetchBorderData(border);
			const name = data.name.common.toLowerCase();

			if (!borderNames.includes(name)) borderNames.push(name);
		}
		if (borders && !ignore) {
			borders.map((border) => {
				async () => await setBorderName(border);
			});
		}
		setBorderCountries([...borderNames]);
		return () => {
			ignore = true;
		};
	}, [borders]);
 */

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
	const currencies = Object.values(countryData.currencies).map(
		(currency) => currency.name
	);
	console.log(countryData);
	return (
		<main
			className="w-full py-10 px-20 bg-white dark:bg-veryDarkBlue
		transition-all duration-300 min-h-[calc(100vh-96px)]"
		>
			<section className="mt-10">
				<Link
					href="/"
					className="group flex gap-4 items-center bg-white dark:bg-darkBlue
					 w-40 h-12 justify-center
        rounded-md shadow-md font-semibold transition-all duration-300 ease-linear
				hover:shadow-xl"
				>
					<Image
						className="rotate-180 transition-all duration-300 ease-out
					group-hover:-translate-x-2 dark:invert"
						src="/icons/arrow-icon.svg"
						alt=""
						aria-hidden="true"
						width={18}
						height={10}
					/>
					Back
				</Link>
				{console.log("work pls", borderNames)}
				<section className="mt-20 flex items-center gap-32">
					<img
						src={countryData.flags.png}
						alt={`${countryData.name.common}'s Flag`}
						className="w-[600px] max-h-[420px] object-contain"
					/>
					<article
						className="text-veryDarkBlueLightMode
					dark:text-white transition-all duration-300"
					>
						<h2 className="font-extrabold text-[32px] mb-6">
							{countryData.name.common}
						</h2>
						<div className="flex gap-36">
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
									: {countryData.subregion}
								</p>
								<p className="font-semibold leading-9">
									<span className="font-extrabold">
										Capital
									</span>
									: {countryData.capital[0]}
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
						<div
							className="flex gap-2 flex-wrap font-semibold leading-9 mt-16 
						w-[800px]"
						>
							<p className=" font-extrabold">Border Countries:</p>{" "}
							{borderNames &&
								borderNames.map((borderName) => (
									<BorderLink
										key={borderName}
										border={borderName}
									/>
								))}
						</div>
					</article>
				</section>
			</section>
		</main>
	);
}
