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
	const countryBorders = await countryData[0].borders;
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
			const name = data[0].name.common.toLowerCase();

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
	const borders = countryData[0].borders && countryData[0].borders;
	const primaryLanguage = Object.keys(countryData[0].languages)[0];
	const nativeName = countryData[0].name.nativeName[primaryLanguage].common;
	const currencies = Object.values(countryData[0].currencies).map(
		(currency) => currency.name
	);
	console.log(countryData);
	return (
		<section className="mt-10">
			<Link
				href="/"
				className="flex gap-4 items-center bg-white w-40 h-12 justify-center
        rounded-md shadow-md font-semibold"
			>
				<Image
					className="rotate-180"
					src="/icons/arrow-icon.svg"
					alt=""
					aria-hidden="true"
					width={18}
					height={10}
				/>{" "}
				Back
			</Link>
			{console.log("work pls", borderNames)}
			<section className="mt-20 flex items-center gap-32">
				<img
					src={countryData[0].flags.png}
					className="w-[600px] max-h-[420px] object-contain"
				/>
				<article>
					<h2 className="font-extrabold text-[32px] mb-6">
						{countryData[0].name.common}
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
								{countryData[0].population.toLocaleString("en")}
							</p>
							<p className="font-semibold leading-9">
								<span className="font-extrabold">Region</span>:{" "}
								{countryData[0].region}
							</p>
							<p className="font-semibold leading-9">
								<span className="font-extrabold">
									Sub Region
								</span>
								: {countryData[0].subregion}
							</p>
							<p className="font-semibold leading-9">
								<span className="font-extrabold">Capital</span>:{" "}
								{countryData[0].capital[0]}
							</p>
						</div>
						<div>
							<p className="font-semibold leading-9">
								<span className="font-extrabold">
									Top Level Domain
								</span>
								: {countryData[0].tld.join(", ")}
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
								{Object.values(countryData[0].languages).join(
									", "
								)}
							</p>
						</div>
					</div>
					<div className="flex gap-4 font-semibold leading-9 mt-16">
						<p className="font-extrabold">Border Countries:</p>{" "}
						<div className="flex gap-2 flex-wrap">
							{borderNames &&
								borderNames.map((borderName) => (
									<BorderLink
										key={borderName}
										border={borderName}
									/>
								))}
						</div>
					</div>
				</article>
			</section>
		</section>
	);
}
