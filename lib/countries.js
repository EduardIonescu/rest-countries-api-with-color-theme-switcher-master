const countriesURL = "https://restcountries.com/v3.1/all";
const countryDynamicURL = `https://restcountries.com/v3.1/name/`;

export async function getAllCountriesIds() {
	const res = await fetch(countriesURL);
	const countries = await res.json();

	const paths = countries.map((country) => {
		return {
			params: {
				name: `${country.name.common.toLowerCase()}`,
			},
		};
	});
	return paths;
}

export async function getCountryData(name) {
	const res = await fetch(`${countryDynamicURL}${name}`);
	return await res.json();
}
