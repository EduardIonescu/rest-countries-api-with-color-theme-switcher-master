### Links

-   Live Site URL: [Click here to see webpage](https://your-live-site-url.com)

# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## Table of contents

-   [Overview](#overview)

    -   [The challenge](#the-challenge)

-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

-   See all countries from the API on the homepage
-   Search for a country using an `input` field
-   Filter countries by region
-   Click on a country to see more detailed information on a separate page
-   Click through to the border countries on the detail page
-   Toggle the color scheme between light and dark mode _(optional)_

## My process

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   Flexbox
-   Mobile-first workflow
-   [React](https://reactjs.org/) - JS library
-   [Next.js](https://nextjs.org/) - React framework
-   [TailwindCSS](https://tailwindcss.com/) - CSS library
-   [cloneDeep](https://www.npmjs.com/package/lodash.clonedeep)- Lodash `cloneDeep`
-   [next-themes](https://www.npmjs.com/package/next-themes) - Nextjs Hook

### What I learned

-   At first I tried to flex the `getStaticProps` that I've just learned by using it to fetch all the data. The con of it is that it makes the whole development process a lot slower, at least on my Unit and fetching the data inside a `useEffect` has a similar outcome.
-   I've learned how to use `getStaticProps` and `getStaticPaths` to get the data during build, which in theory should make the website faster once it's deployed.
-   I've learned that there are different use cases for `getStaticProps` vs `SWR` vs simply fetching inside a `useEffect`.
-   Got some practice by manipulating a quite difficult data from an API.
-   Had a hard time figuring out how to fetch all the border countries correctly until I've found that I can map asynchronously:

```js
export async function getAllCountryBorders(borders) {
	const borderNames = borders.map(async (border) => {
		return await getBordercountry(border);
	});
	return await Promise.all(borderNames);
}
```

### Continued development

-   Practice more and learning more about the different use cases for the fetch methods.
-   Practice more data manipulation / sorting.

### Useful resources

-   [getStaticProps](https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops) - This and `getStaticPaths` are great ways to implement dynamic pages. A bit of a learning curve on this one, but I'm glad I've made it work!
-   [React Docs - Refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs) - Great tutorials on how to use Ref hooks + `forwardRef`

## Author

-   Website - [EduardIonescu](https://ionescueduard.netlify.app)
-   Frontend Mentor - [@EduardIonescu](https://www.frontendmentor.io/profile/EduardIonescu)

## Acknowledgments

The design from FrontendMentor is poorly illustrated and doesn't have a lot of info.
Sometimes I was in doubt about something, for example the `filter` button didn't have a way to get back to all the countries and that's when I'd take a look at
[Catherine's](https://github.com/catherineisonline) solution and try to implement something similar of my own.
