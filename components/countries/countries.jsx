import CountryCard from "./countryCard";

export default function Countries({ countriesData, filteredData }) {
	return (
		<section
			className="my-8 md:my-12 flex flex-wrap flex-col items-center
			 sm:flex-row 
      xl:gap-x-[calc((100%-(256px*4))/3)] lg:gap-x-[calc((100%-(256px*3))/2)] 
      sm:gap-x-[calc(100%-(256px*2))] gap-y-10 md:gap-y-20"
		>
			{countriesData.length >= 1
				? filteredData.map((country) => (
						<CountryCard key={country.cca2} country={country} />
				  ))
				: "Loading..."}
		</section>
	);
}
