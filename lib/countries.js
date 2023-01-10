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
	// The api returns a list of countries that could match the name
	// For example for china, it returns 4 countries
	const res = await fetch(`${countryDynamicURL}${name}`);
	const countryList = await res.json();
	// This makes sure it will return only the country I'm looking for
	const country = countryList.find(
		(c) => c.name.common.toLowerCase() == name
	);

	return country;
}

async function getBordercountry(border) {
	const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
	const country = await res.json();
	const name = country[0].name.common.toLowerCase();

	return name;
}

export async function getAllCountryBorders(borders) {
	const borderNames = borders.map(async (border) => {
		return await getBordercountry(border);
	});

	return await Promise.all(borderNames);
}
