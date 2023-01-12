import {
	getAllCountriesIds,
	getCountryData,
	getAllCountryBorders,
} from "../../lib/countries";
import BackButton from "../../components/countryPage/backButton";

import CountryDetails from "../../components/countryPage/countryDetails";

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
	return (
		<main
			className="w-full pt-10 pb-16 md:pb-10 px-6 md:px-20 bg-white 
		 dark:bg-veryDarkBlue transition-all duration-300 min-h-[calc(100vh-96px)]"
		>
			<section className="md:mt-10">
				<BackButton />
				<section
					className="mt-16 md:mt-20 flex items-center gap-12 md:gap-20 
				justify-between flex-col md:flex-row"
				>
					<img
						src={countryData.flags.png}
						alt={`${countryData.name.common}'s Flag`}
						className="w-full md:w-[560px] 2xl:w-[650px] max-md:max-w-[400px] 
						max-h-[420px] 2xl:max-h-[500] object-contain 
						shadow-md xl:object-cover"
					/>
					<CountryDetails
						countryData={countryData}
						borderNames={borderNames}
					/>
				</section>
			</section>
		</main>
	);
}
