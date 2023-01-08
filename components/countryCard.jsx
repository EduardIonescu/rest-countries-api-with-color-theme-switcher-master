export default function CountryCard({ country }) {
	return (
		<article key={country.cca2} className="rounded-xl overflow-hidden">
			<img
				src={country.flags.png}
				width={250}
				height={160}
				className="w-64 h-40 object-cover"
			/>

			<div className="px-[26px] text-veryDarkBlueLightMode">
				<h2 className="py-7 font-extrabold">{country.name.common}</h2>
				<p>Population: {country.population}</p>
				<p>Region: {country.region}</p>
				<p>Capital: {country.capital}</p>
			</div>
		</article>
	);
}
