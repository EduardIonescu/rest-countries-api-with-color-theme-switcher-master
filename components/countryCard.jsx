export default function CountryCard({ country }) {
	return (
		<article
			key={country.cca2}
			className="h-[345px] rounded-md overflow-hidden bg-white shadow"
		>
			<img
				src={country.flags.png}
				width={250}
				height={160}
				className="w-64 h-40 object-cover"
			/>

			<div
				className="px-[26px] text-veryDarkBlueLightMode text-[14px] font-light
      leading-6"
			>
				<h2 className="pt-7 pb-5 font-extrabold text-[19px]">
					{country.name.common}
				</h2>
				<p>
					<span className="font-semibold">Population:</span>{" "}
					{country.population.toLocaleString()}
				</p>
				<p>
					<span className="font-semibold">Region:</span>{" "}
					{country.region}
				</p>
				<p>
					<span className="font-semibold">Capital:</span>{" "}
					{country.capital}
				</p>
			</div>
		</article>
	);
}
