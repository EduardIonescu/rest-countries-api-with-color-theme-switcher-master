import { getAllCountriesIds, getCountryData } from "../../lib/countries";
import Link from "next/link";
import Image from "next/image";
import BorderLink from "../../components/borderLink";

export async function getStaticProps({ params }) {
	const countryData = await getCountryData(params.name);
	return {
		props: {
			countryData,
		},
	};
}

export async function getStaticPaths() {
	const paths = await getAllCountriesIds();
	return {
		paths,
		fallback: false,
	};
}

export default function Country({ countryData }) {
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
					width={18}
					height={10}
				/>{" "}
				Back
			</Link>

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
							{countryData[0].borders.map((border) => (
								<BorderLink key={border} border={border} />
							))}
						</div>
					</div>
				</article>
			</section>
		</section>
	);
}
